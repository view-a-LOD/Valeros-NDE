import { Component, inject, Signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherChevronRight } from '@ng-icons/feather-icons';
import { BreadcrumbService, BreadcrumbItem } from '../breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [NgIconComponent],
  templateUrl: './breadcrumb.component.html',
  viewProviders: [provideIcons({ featherChevronRight })],
})
export class BreadcrumbComponent {
  private breadcrumbService = inject(BreadcrumbService);

  protected breadcrumbs: Signal<BreadcrumbItem[]> =
    this.breadcrumbService.getBreadcrumbs;

  onBreadcrumbClick(index: number): void {
    this.breadcrumbService.navigateToBreadcrumb(index);
  }
}
