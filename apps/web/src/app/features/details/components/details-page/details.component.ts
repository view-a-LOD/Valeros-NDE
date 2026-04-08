import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchApiService } from '../../../search/services/search-api.service';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { NodeComponent } from '../../../search/components/node/node.component';

@Component({
  selector: 'app-details',
  imports: [CommonModule, NodeComponent],
  templateUrl: './details.component.html',
  standalone: true,
})
export class DetailsComponent implements OnInit {
  id: string | null = null;
  decodedId: string | null = null;
  data = signal<SearchNode | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private searchApiService = inject(SearchApiService);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.decodedId = decodeURIComponent(this.id);
      this.fetchData();
    }
  }

  private fetchData() {
    if (!this.decodedId) return;

    this.loading.set(true);
    this.error.set(null);

    const filters = JSON.stringify({
      '@id': { $eq: this.decodedId },
    });

    this.searchApiService
      .search({
        query: '',
        filters: filters,
      })
      .subscribe({
        next: (response) => {
          if (response.results.length > 0) {
            this.data.set(response.results[0]);
          } else {
            this.error.set('No data found for this ID');
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load data: ' + err.message);
          this.loading.set(false);
        },
      });
  }
}
