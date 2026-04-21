import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchStore } from '../../state/search.store';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NodeComponent } from '../../../../shared/components/node/node.component';
import { FacetsComponent } from '../facets/facets.component';
import { DrawerLayoutComponent } from './drawer-layout/drawer-layout.component';
import { DrawerToggleButtonComponent } from './drawer-layout/drawer-toggle-button/drawer-toggle-button.component';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import { SearchStateService } from '../../../../shared/services/search-state.service';

@Component({
  selector: 'app-search-page',
  imports: [
    CommonModule,
    SearchBarComponent,
    NodeComponent,
    FacetsComponent,
    DrawerLayoutComponent,
    DrawerToggleButtonComponent,
  ],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent implements OnInit {
  store = inject(SearchStore);
  private breadcrumbService = inject(BreadcrumbService);
  private searchStateService = inject(SearchStateService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.breadcrumbService.reset();

    this.route.queryParams.subscribe((params) => {
      this.searchStateService.setSearchParams(params);
    });
  }
}
