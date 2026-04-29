import { Component, inject, input, output } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { ViewType } from '../../views/types/view-type';
import { ViewService } from '../../views/infrastructure/view.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-switcher',
  imports: [NgIconComponent],
  templateUrl: './view-switcher.component.html',
})
export class ViewSwitcherComponent {
  private viewService = inject(ViewService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentView = input.required<ViewType>();
  viewChange = output<ViewType>();

  protected readonly availableViews = this.viewService.getAllViewMappings();

  onViewChange(viewType: ViewType): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: viewType },
      queryParamsHandling: 'merge',
    });
  }
}
