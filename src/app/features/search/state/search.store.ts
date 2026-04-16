import { Injectable, inject, signal, effect } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FilterStore } from './filter.store';
import { NodeModel } from '../../../shared/types/node/node.model';
import { SearchResponse } from '../types/search-response';
import { Facet } from '../types/facet';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private searchApiService = inject(ApiService);
  private filterStore = inject(FilterStore);

  searchTerm = signal('');
  results = signal<NodeModel[]>([]);
  totalResults = signal(0);
  facets = signal<Facet[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.performInitialSearch();
    this.initSearchOnFilterChanges();
  }

  private initSearchOnFilterChanges(): void {
    effect(() => {
      this.filterStore.selectedFilters();
      if (this.searchTerm()) {
        this.search();
      }
    });
  }

  private performInitialSearch(): void {
    this.searchTerm.set('*');
    this.search();
  }

  search(): void {
    const trimmedTerm = this.searchTerm().trim();

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

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }
}
