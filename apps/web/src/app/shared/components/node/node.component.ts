import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchNode } from '@valeros-ldkit/shared-types';
import { DynamicWidgetComponent } from '../dynamic-widget/dynamic-widget.component';
import { WidgetService } from '../../services/widget.service';
import {
  getVisibleProperties,
  sortProperties,
} from '../../utils/property-filter.util';

@Component({
  selector: 'app-node',
  imports: [CommonModule, DynamicWidgetComponent],
  templateUrl: './node.component.html',
  standalone: true,
})
export class NodeComponent {
  data = input.required<SearchNode>();

  private router = inject(Router);
  private widgetService = inject(WidgetService);

  orderedProperties = computed(() => {
    const settings = this.widgetService.getCurrentSettings();
    const properties = Object.keys(this.data());
    const visibleProperties = getVisibleProperties(properties, settings);
    return sortProperties(visibleProperties, settings.propertyOrder);
  });

  navigateToDetails(): void {
    const id = this.data()['@id'];
    if (id) {
      this.router.navigate(['/details', encodeURIComponent(id)]);
    }
  }
}
