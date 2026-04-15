import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../search/services/api.service';
import { NodeComponent } from '../../../../shared/components/node/node.component';
import { NodeModel } from '../../../../shared/types/node/node.model';

@Component({
  selector: 'app-details',
  imports: [CommonModule, NodeComponent],
  templateUrl: './details.component.html',
  standalone: true,
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  decodedId: string | null = null;
  data = signal<NodeModel | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private searchApiService = inject(ApiService);
  private routeSubscription?: Subscription;

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.decodedId = decodeURIComponent(this.id);
        this.fetchData();
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
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
