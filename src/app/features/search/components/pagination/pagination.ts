import { Component, computed, inject, input } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, RouterLink],
  templateUrl: './pagination.html',
})
export class Pagination {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentPage = input.required<number>();
  totalItems = input.required<number>();
  pageSize = input.required<number>();

  protected readonly totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.pageSize());
  });

  protected readonly hasPrevious = computed(() => {
    return this.currentPage() > 1;
  });

  protected readonly hasNext = computed(() => {
    return this.currentPage() < this.totalPages();
  });

  protected readonly pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      pages.push(total);
    }

    return pages;
  });

  goToPage(page: number): void {
    const isInvalidPage = page < 1 || page > this.totalPages();
    const isAlreadyOnPage = page === this.currentPage();
    if (isInvalidPage || isAlreadyOnPage) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  goToPrevious(): void {
    if (this.hasPrevious()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  goToNext(): void {
    if (this.hasNext()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  getPageQueryParams(page: number): Record<string, string> {
    return { page: page.toString() };
  }

  getPreviousPageQueryParams(): Record<string, string> {
    return this.getPageQueryParams(this.currentPage() - 1);
  }

  getNextPageQueryParams(): Record<string, string> {
    return this.getPageQueryParams(this.currentPage() + 1);
  }
}
