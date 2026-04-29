import {
  Component,
  inject,
  OnInit,
  ViewContainerRef,
  viewChild,
  effect,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchStore } from '../../state/search.store';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FacetsComponent } from '../facets/facets.component';
import { DrawerLayoutComponent } from './drawer-layout/drawer-layout.component';
import { DrawerToggleButtonComponent } from './drawer-layout/drawer-toggle-button/drawer-toggle-button.component';
import { SearchSort } from '../search-sort/search-sort';
import { ResultsCount } from '../results-count/results-count';
import { Pagination } from '../pagination/pagination';
import { ViewSwitcherComponent } from '../view-switcher/view-switcher.component';
import { ViewService } from '../../views/infrastructure/view.service';
import { ViewType } from '../../views/types/view-type';
import { BreadcrumbService } from '../../../../shared/breadcrumbs/breadcrumb.service';
import { SearchStateService } from '../../../../shared/navigation/search-state.service';
import { BreakpointService } from '../../../../shared/breakpoint/breakpoint.service';
import { featherFilter } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-search-page',
  imports: [
    CommonModule,
    SearchBarComponent,
    FacetsComponent,
    DrawerLayoutComponent,
    DrawerToggleButtonComponent,
    SearchSort,
    ResultsCount,
    Pagination,
    ViewSwitcherComponent,
  ],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent implements OnInit {
  store = inject(SearchStore);
  private breadcrumbService = inject(BreadcrumbService);
  private searchStateService = inject(SearchStateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private breakpointService = inject(BreakpointService);
  private viewService = inject(ViewService);

  viewContainer = viewChild('viewContainer', { read: ViewContainerRef });

  currentViewConfig = computed(() => {
    return this.viewService.getViewConfig(this.store.currentView());
  });
  protected readonly featherFilter = featherFilter;
  protected readonly isDesktop = this.breakpointService.isDesktop;

  constructor() {
    this.loadViewWhenContainerIsReady();
  }

  ngOnInit(): void {
    this.breadcrumbService.reset();

    this.route.queryParams.subscribe((params) => {
      this.searchStateService.setSearchParams(params);
    });
  }

  private loadViewWhenContainerIsReady(): void {
    effect(() => {
      const viewContainer = this.viewContainer();

      if (viewContainer) {
        viewContainer.clear();

        const component = this.viewService.getViewComponent(
          this.store.currentView(),
        );
        const config = this.viewService.getViewConfig(this.store.currentView());

        if (component) {
          const componentRef = viewContainer.createComponent(component);
          componentRef.setInput('results', this.store.results());
          componentRef.setInput('totalResults', this.store.totalResults());
          componentRef.setInput('currentPage', this.store.currentPage());
          componentRef.setInput('pageSize', this.store.pageSize());
          componentRef.setInput('config', config);
        }
      }
    });
  }
}
