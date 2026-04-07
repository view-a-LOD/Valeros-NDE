import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { DynamicWidgetComponent } from '../../../../shared/components/widgets/dynamic-widget/dynamic-widget.component';
import { PropertyLabelWrapperComponent } from '../../../../shared/components/property-label-wrapper/property-label-wrapper.component';
import { WIDGETS_SETTINGS } from '../../../../config/widgets.settings';

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
    const allProps = Object.keys(this.result()).filter(
      (prop) => !WIDGETS_SETTINGS.hiddenProperties?.includes(prop),
    );

    return allProps.sort((a, b) => {
      const indexA = WIDGETS_SETTINGS.propertyOrder?.indexOf(a) ?? -1;
      const indexB = WIDGETS_SETTINGS.propertyOrder?.indexOf(b) ?? -1;

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
