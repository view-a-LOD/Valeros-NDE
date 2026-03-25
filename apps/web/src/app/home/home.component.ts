import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NodeType } from '@valeros-ldkit/shared-types';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  searchTerm = signal('');
  results = signal<NodeType[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  endpoints = ['https://api.triplydb.com/datasets/academy/pokemon/sparql'];

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
        endpoints: this.endpoints,
        filters: filters,
      })
      .subscribe({
        next: (results) => {
          this.results.set(results);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to search: ' + err.message);
          this.loading.set(false);
          this.results.set([]);
        },
      });
  }
}
