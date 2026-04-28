import { Component, computed, inject } from '@angular/core';
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

  protected readonly getFacetLabel = getFacetLabel;

  hasFacetWithItems = computed(() =>
    this.store.facets().some((facet) => facet.orderedItems.length > 0),
  );

  onFacetToggle(facetName: string, value: string): void {
    this.filterStore.toggleFilter(facetName, value);
  }

  isSelected(facetName: string, value: string): boolean {
    return this.filterStore.isFilterSelected(facetName, value);
  }
}
