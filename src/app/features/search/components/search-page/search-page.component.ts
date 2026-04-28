import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchStore } from '../../state/search.store';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NodeComponent } from '../../../../shared/node/node.component';
import { FacetsComponent } from '../facets/facets.component';
import { DrawerLayoutComponent } from './drawer-layout/drawer-layout.component';
import { DrawerToggleButtonComponent } from './drawer-layout/drawer-toggle-button/drawer-toggle-button.component';
import { SearchSort } from '../search-sort/search-sort';
import { ResultsCount } from '../results-count/results-count';
import { Pagination } from '../pagination/pagination';
import { BreadcrumbService } from '../../../../shared/breadcrumbs/breadcrumb.service';
import { SearchStateService } from '../../../../shared/navigation/search-state.service';
import { featherFilter } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-search-page',
  imports: [
    CommonModule,
    SearchBarComponent,
    NodeComponent,
    FacetsComponent,
    DrawerLayoutComponent,
    DrawerToggleButtonComponent,
    SearchSort,
    ResultsCount,
    Pagination,
  ],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent implements OnInit {
  store = inject(SearchStore);
  private breadcrumbService = inject(BreadcrumbService);
  private searchStateService = inject(SearchStateService);
  private route = inject(ActivatedRoute);

  protected readonly featherFilter = featherFilter;

  ngOnInit(): void {
    this.breadcrumbService.reset();

    this.route.queryParams.subscribe((params) => {
      this.searchStateService.setSearchParams(params);
    });
  }
}
