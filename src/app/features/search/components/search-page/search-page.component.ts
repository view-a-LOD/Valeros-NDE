import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStore } from '../../state/search.store';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NodeComponent } from '../../../../shared/components/node/node.component';
import { FacetsComponent } from '../facets/facets.component';
import { DrawerLayoutComponent } from './drawer-layout/drawer-layout.component';
import { DrawerToggleButtonComponent } from './drawer-layout/drawer-toggle-button/drawer-toggle-button.component';
import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';

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

  ngOnInit(): void {
    this.breadcrumbService.reset();
  }
}
