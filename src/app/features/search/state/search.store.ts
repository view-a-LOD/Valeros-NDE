import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, skip, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FilterStore } from './filter.store';
import { NodeModel } from '../../../shared/types/node/node.model';
import { SearchResponse } from '../types/search-response';
import { Facet } from '../types/facet';
import { Filters } from '../types/filters';

interface SearchUrlParams {
  q: string;
  filters: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private searchApiService = inject(ApiService);
  private filterStore = inject(FilterStore);
  private route = inject(ActivatedRoute);

  searchTerm = signal('');
  results = signal<NodeModel[]>([]);
  totalResults = signal(0);
  facets = signal<Facet[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.initSearchOnUrlChanges();
  }

  private initSearchOnUrlChanges(): void {
    let previousQuery: string | null = null;

    this.route.queryParams
      .pipe(
        map(
          (params): SearchUrlParams => ({
            q: params['q'] || '*',
            filters: params['filters'] || null,
          }),
        ),
        distinctUntilChanged((prev: SearchUrlParams, curr: SearchUrlParams) => {
          const queryChanged = prev.q !== curr.q;
          const filtersChanged = prev.filters !== curr.filters;
          return !queryChanged && !filtersChanged;
        }),
      )
      .subscribe(({ q: query, filters }: SearchUrlParams) => {
        this.filterStore.clearFiltersIfQueryChanged(query, previousQuery);
        this.filterStore.syncFiltersFromUrl(filters);

        previousQuery = query;
        this.searchTerm.set(query);
        this.performSearch(query);
      });
  }

  private performSearch(term: string): void {
    const trimmedTerm = term.trim();

    if (!trimmedTerm) {
      this.results.set([]);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const filters = this.filterStore.buildFilterStrings();

    // TODO: Replace hardcoded size and page
    this.searchApiService
      .search({
        q: trimmedTerm,
        size: 10,
        page: 1,
        ...(filters.length > 0 && { filter: filters }),
      })
      .subscribe({
        next: (response: SearchResponse) => {
          this.results.set(response.orderedItems);
          this.totalResults.set(response.partOf.totalItems);
          this.facets.set(response.partOf.facets || []);
          this.loading.set(false);

          console.log('Search results:', response);
        },
        error: (err) => {
          this.error.set('Failed to search: ' + err.message);
          this.loading.set(false);
          this.results.set([]);
          this.totalResults.set(0);
          this.facets.set([]);
        },
      });
  }
}
