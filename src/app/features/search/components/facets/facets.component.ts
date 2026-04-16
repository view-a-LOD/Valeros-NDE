import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchStore } from '../../state/search.store';
import { FilterStore } from '../../state/filter.store';

@Component({
  selector: 'app-facets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facets.component.html',
})
export class FacetsComponent {
  store = inject(SearchStore);
  filterStore = inject(FilterStore);

  onFacetToggle(facetName: string, value: string): void {
    this.filterStore.toggleFilter(facetName, value);
  }

  isSelected(facetName: string, value: string): boolean {
    return this.filterStore.isFilterSelected(facetName, value);
  }
}
