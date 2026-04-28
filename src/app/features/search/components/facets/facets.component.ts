import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStore } from '../../state/search.store';
import { FilterStore } from '../../state/filter.store';
import { getFacetLabel } from '../../config/facet-labels.config';

@Component({
  selector: 'app-facets',

  imports: [CommonModule],
  templateUrl: './facets.component.html',
})
export class FacetsComponent {
  store = inject(SearchStore);
  filterStore = inject(FilterStore);
  getFacetLabel = getFacetLabel;

  onFacetToggle(facetName: string, value: string): void {
    this.filterStore.toggleFilter(facetName, value);
  }

  isSelected(facetName: string, value: string): boolean {
    return this.filterStore.isFilterSelected(facetName, value);
  }
}
