import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DynamicWidgetComponent } from '../dynamic-widget/dynamic-widget.component';
import { WidgetService } from '../../services/widget.service';
import { WidgetPosition, WidgetMapping } from '../../types/widget-config';
import {
  getVisibleProperties,
  sortProperties,
} from '../../utils/property-filter.util';
import { NodeModel } from '../../types/node/node.model';

@Component({
  selector: 'app-node',
  imports: [CommonModule, DynamicWidgetComponent, RouterLink],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  standalone: true,
  host: {
    class: 'block',
  },
})
export class NodeComponent {
  data = input.required<NodeModel>();
  clickable = input<boolean>(true);

  private widgetService = inject(WidgetService);

  orderedProperties = computed(() => {
    const settings = this.widgetService.getCurrentSettings();
    const properties = Object.keys(this.data());
    const visibleProperties = getVisibleProperties(properties, settings);
    return sortProperties(visibleProperties, settings.propertyOrder);
  });

  widgetsByPosition = computed(() => {
    const properties: string[] = this.orderedProperties();
    const byPosition: Record<
      WidgetPosition,
      Array<{ property: string; widget: WidgetMapping }>
    > = {
      top: [],
      left: [],
      main: [],
      right: [],
      bottom: [],
    };

    properties.forEach((property) => {
      const widgets = this.widgetService.getWidgetsForProperty(property);
      widgets.forEach((widget) => {
        const position = widget.config?.position || 'main';
        byPosition[position].push({ property, widget });
      });
    });

    return byPosition;
  });

  detailsRoute = computed(() => {
    const id = this.data().id;
    return id ? ['/details'] : null;
  });

  detailsQueryParams = computed(() => {
    const id = this.data().id;
    return id ? { id } : null;
  });
}
