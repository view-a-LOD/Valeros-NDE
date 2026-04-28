import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, skip, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FilterStore } from './filter.store';
import { SearchResponse } from '../types/search-response';
import { Facet } from '../types/facet';
import { Filters } from '../types/filters';
import { ApiService } from '../../../shared/api/api.service';
import { NodeModel } from '../../../shared/node/types/node.model';

interface SearchUrlParams {
  q: string;
  filters: string | null;
  page: number;
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
  currentPage = signal(1);
  pageSize = signal(20);
  nextPage = signal<string | undefined>(undefined);
  prevPage = signal<string | undefined>(undefined);

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
            page: params['page'] ? parseInt(params['page'], 10) : 1,
          }),
        ),
        distinctUntilChanged((prev: SearchUrlParams, curr: SearchUrlParams) => {
          const queryChanged = prev.q !== curr.q;
          const filtersChanged = prev.filters !== curr.filters;
          const pageChanged = prev.page !== curr.page;
          return !queryChanged && !filtersChanged && !pageChanged;
        }),
      )
      .subscribe(({ q: query, filters, page }: SearchUrlParams) => {
        this.filterStore.clearFiltersIfQueryChanged(query, previousQuery);
        this.filterStore.syncFiltersFromUrl(filters);

        previousQuery = query;
        this.searchTerm.set(query);
        this.currentPage.set(page);
        this.performSearch(query, page);
      });
  }

  private performSearch(term: string, page: number = 1): void {
    const trimmedTerm = term.trim();

    if (!trimmedTerm) {
      this.results.set([]);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const filters = this.filterStore.buildFilterStrings();

    this.searchApiService
      .search({
        q: trimmedTerm,
        size: this.pageSize(),
        page,
        ...(filters.length > 0 && { filter: filters }),
      })
      .subscribe({
        next: (response: SearchResponse) => {
          this.results.set(response.orderedItems);
          this.totalResults.set(response.partOf.totalItems);
          this.facets.set(response.partOf.facets || []);
          this.nextPage.set(response.next);
          this.prevPage.set(response.prev);
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
