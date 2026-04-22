import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NodeComponent } from '../../../../shared/ui/node/node.component';
import { NodeModel } from '../../../../core/models/node/node.model';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import { BreadcrumbComponent } from '../../../../shared/ui/breadcrumb/breadcrumb.component';
import { normalizeToFirst } from '../../../../shared/utils/value-normalization.util';
import { ApiService } from '../../../../core/services/api/api.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, NodeComponent, BreadcrumbComponent],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  data = signal<NodeModel | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
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

    this.apiService.details(this.id).subscribe({
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
