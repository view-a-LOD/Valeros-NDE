import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../search/services/api.service';
import { NodeComponent } from '../../../../shared/components/node/node.component';
import { NodeModel } from '../../../../shared/types/node/node.model';

@Component({
  selector: 'app-details',
  imports: [CommonModule, NodeComponent],
  templateUrl: './details.component.html',
  standalone: true,
})
export class DetailsComponent implements OnInit {
  id: string | null = null;
  decodedId: string | null = null;
  data = signal<NodeModel | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private searchApiService = inject(ApiService);

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

    this.searchApiService.details(this.decodedId).subscribe({
      next: (response: NodeModel) => {
        this.data.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load data: ' + err.message);
        this.loading.set(false);
      },
    });
  }
}
