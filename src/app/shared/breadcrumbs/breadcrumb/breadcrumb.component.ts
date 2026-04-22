import { Component, inject, Signal } from '@angular/core';
import { BreadcrumbService, BreadcrumbItem } from '../breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',

  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  private breadcrumbService = inject(BreadcrumbService);

  protected breadcrumbs: Signal<BreadcrumbItem[]> =
    this.breadcrumbService.getBreadcrumbs;

  onBreadcrumbClick(index: number): void {
    this.breadcrumbService.navigateToBreadcrumb(index);
  }
}
