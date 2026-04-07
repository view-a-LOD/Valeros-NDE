import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { DynamicWidgetComponent } from '../../../../shared/components/widgets/dynamic-widget/dynamic-widget.component';
import { PropertyLabelWrapperComponent } from '../../../../shared/components/property-label-wrapper/property-label-wrapper.component';
import { WidgetService } from '../../../../shared/services/widget.service';
import {
  getVisibleProperties,
  sortProperties,
} from '../../../../shared/utils/property-filter.util';

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
  private widgetService = inject(WidgetService);

  orderedProperties = computed(() => {
    const settings = this.widgetService.getCurrentSettings();
    const properties = Object.keys(this.result());
    const visibleProperties = getVisibleProperties(properties, settings);
    return sortProperties(visibleProperties, settings.propertyOrder);
  });

  navigateToDetails(): void {
    const id = this.result()['@id'];
    if (id) {
      this.router.navigate(['/details', encodeURIComponent(id)]);
    }
  }
}
