import { Injectable, inject, signal } from '@angular/core';
import { SearchApiService } from '../services/search-api.service';
import { NodeModel } from '../../../shared/types/node/node.model';
import { SearchResponse } from '../types/search-response';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private searchApiService = inject(SearchApiService);

  searchTerm = signal('');
  results = signal<NodeModel[]>([]);
  totalResults = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.performInitialSearch();
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

    // TODO: Replace hardcoded size and page
    this.searchApiService
      .search({
        q: trimmedTerm,
        size: 10,
        page: 1,
      })
      .subscribe({
        next: (response: SearchResponse) => {
          this.results.set(response.orderedItems);
          this.totalResults.set(response.partOf.totalItems);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to search: ' + err.message);
          this.loading.set(false);
          this.results.set([]);
          this.totalResults.set(0);
        },
      });
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }
}
