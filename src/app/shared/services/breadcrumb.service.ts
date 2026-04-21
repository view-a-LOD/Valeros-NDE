import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  route: string[];
  queryParams?: Record<string, string>;
}

export interface NavigationState {
  searchParams?: Record<string, string>;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private router = inject(Router);
  private breadcrumbs = signal<BreadcrumbItem[]>([]);

  getBreadcrumbs = computed(() => this.breadcrumbs());

  addBreadcrumb(item: BreadcrumbItem): void {
    let current = this.breadcrumbs();

    if (current.length === 0) {
      this.initializeSearchBreadcrumbIfNeeded();
      current = this.breadcrumbs();
    }

    const existingItemIndex = current.findIndex(
      (crumb) =>
        crumb.route.join('/') === item.route.join('/') &&
        JSON.stringify(crumb.queryParams) === JSON.stringify(item.queryParams),
    );

    const isNavigatingBackToExistingPage = existingItemIndex !== -1;

    if (isNavigatingBackToExistingPage) {
      const truncatedTrail = current.slice(0, existingItemIndex + 1);
      this.breadcrumbs.set(truncatedTrail);
    } else {
      const extendedTrail = [...current, item];
      this.breadcrumbs.set(extendedTrail);
    }
  }

  private initializeSearchBreadcrumbIfNeeded(): void {
    const state = window.history.state as NavigationState;

    if (state?.searchParams) {
      this.setSearchBreadcrumb(state.searchParams);
    } else {
      this.setSearchBreadcrumb({});
    }
  }

  navigateToBreadcrumb(index: number): void {
    const current = this.breadcrumbs();
    if (index < 0 || index >= current.length) return;

    const targetBreadcrumb = current[index];
    const truncatedTrail = current.slice(0, index + 1);
    this.breadcrumbs.set(truncatedTrail);

    this.router.navigate(targetBreadcrumb.route, {
      queryParams: targetBreadcrumb.queryParams,
    });
  }

  reset(): void {
    this.breadcrumbs.set([]);
  }

  setSearchBreadcrumb(queryParams: Record<string, string>): void {
    const query = queryParams['q'];
    const label = query && query !== '*' ? `Zoeken: "${query}"` : 'Zoeken';

    const searchBreadcrumb: BreadcrumbItem = {
      label,
      route: ['/'],
      queryParams,
    };

    const current = this.breadcrumbs();
    if (current.length === 0) {
      this.breadcrumbs.set([searchBreadcrumb]);
    }
  }
}
