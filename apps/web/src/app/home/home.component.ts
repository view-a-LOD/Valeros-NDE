import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchNode, SearchResponse } from '@valeros-ldkit/shared-types';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  searchTerm = signal('');
  results = signal<SearchNode[]>([]);
  totalResults = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  private searchService = inject(SearchService);

  onSearch(): void {
    const term = this.searchTerm().trim();

    if (!term) {
      this.results.set([]);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const filters = JSON.stringify({
      label: { $contains: term },
    });

    this.searchService
      .search({
        query: term,
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
}
