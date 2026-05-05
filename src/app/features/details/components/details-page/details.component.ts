import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NodeComponent } from '../../../../shared/node/node.component';
import { BreadcrumbService } from '../../../../shared/breadcrumbs/breadcrumb.service';
import { normalizeToFirst } from '../../../../shared/data-utils/value-normalization.util';
import { BreadcrumbComponent } from '../../../../shared/breadcrumbs/breadcrumb/breadcrumb.component';
import { ApiService } from '../../../../shared/api/api.service';
import { NodeModel } from '../../../../shared/node/types/node.model';
import { PageTitleService } from '../../../../shared/page-title/page-title.service';

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
  private pageTitleService = inject(PageTitleService);
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
        console.log('Details response:', response);
        this.data.set(response);
        this.loading.set(false);
        this.addBreadcrumb(response);
        this.updatePageTitle(response);
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

  private updatePageTitle(data: NodeModel): void {
    const label: string =
      normalizeToFirst<string>(data.name) || data.id || 'Details';
    this.pageTitleService.setTitleWithFallback(label, 'Details');
  }
}
