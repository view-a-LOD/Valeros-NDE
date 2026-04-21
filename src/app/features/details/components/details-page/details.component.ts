import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../search/services/api.service';
import { NodeComponent } from '../../../../shared/components/node/node.component';
import { NodeModel } from '../../../../shared/types/node/node.model';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { normalizeToFirst } from '../../../../shared/utils/value-normalization.util';

@Component({
  selector: 'app-details',
  imports: [CommonModule, NodeComponent, BreadcrumbComponent],
  templateUrl: './details.component.html',
  standalone: true,
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  data = signal<NodeModel | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private searchApiService = inject(ApiService);
  private breadcrumbService = inject(BreadcrumbService);
  private routeSubscription?: Subscription;

  ngOnInit() {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.fetchData();
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  private fetchData() {
    if (!this.id) return;

    this.loading.set(true);
    this.error.set(null);

    this.searchApiService.details(this.id).subscribe({
      next: (response: NodeModel) => {
        this.data.set(response);
        this.loading.set(false);
        this.addBreadcrumb(response);
      },
      error: (err) => {
        this.error.set('Failed to load data: ' + err.message);
        this.loading.set(false);
      },
    });
  }

  private addBreadcrumb(data: NodeModel): void {
    const label: string =
      normalizeToFirst<string>(data.name) || data.id || 'Details';
    this.breadcrumbService.addBreadcrumb({
      label,
      route: ['/details'],
      queryParams: { id: this.id! },
    });
  }
}
