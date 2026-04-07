import { Injectable, inject, signal } from '@angular/core';
import { SearchNode, SearchResponse } from '@valeros-ldkit/shared-types';
import { SearchApiService } from '../services/search-api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private searchApiService = inject(SearchApiService);

  searchTerm = signal('');
  results = signal<SearchNode[]>([]);
  totalResults = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  search(): void {
    const trimmedTerm = this.searchTerm().trim();

    if (!trimmedTerm) {
      this.results.set([]);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const filters = JSON.stringify({
      label: { $contains: trimmedTerm },
    });

    this.searchApiService
      .search({
        query: trimmedTerm,
        filters: filters,
      })
      .subscribe({
        next: (response: SearchResponse) => {
          this.results.set(response.results);
          this.totalResults.set(response.totalResults);
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
