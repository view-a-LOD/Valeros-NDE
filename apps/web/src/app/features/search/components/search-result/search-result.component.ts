import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { DynamicWidgetComponent } from '../../../../shared/components/widgets/dynamic-widget/dynamic-widget.component';
import { PropertyLabelWrapperComponent } from '../../../../shared/components/property-label-wrapper/property-label-wrapper.component';
import { PROPERTY_ORDER } from '../../../../config/widgets.config';

@Component({
  selector: 'app-search-result',
  imports: [
    CommonModule,
    DynamicWidgetComponent,
    PropertyLabelWrapperComponent,
  ],
  templateUrl: './search-result.component.html',
  standalone: true,
})
export class SearchResultComponent {
  result = input.required<SearchNode>();

  private router = inject(Router);

  orderedProperties = computed(() => {
    const allProps = Object.keys(this.result());

    return allProps.sort((a, b) => {
      const indexA = PROPERTY_ORDER.indexOf(a);
      const indexB = PROPERTY_ORDER.indexOf(b);

      const orderIsDefinedForA = indexA !== -1;
      const orderIsDefinedForB = indexB !== -1;

      if (orderIsDefinedForA && orderIsDefinedForB) return indexA - indexB;
      if (orderIsDefinedForA) return -1;
      if (orderIsDefinedForB) return 1;
      if (!orderIsDefinedForA && !orderIsDefinedForB) return a.localeCompare(b);

      return 0;
    });
  });

  navigateToDetails(): void {
    const id = this.result()['@id'];
    if (id) {
      this.router.navigate(['/details', encodeURIComponent(id)]);
    }
  }
}
