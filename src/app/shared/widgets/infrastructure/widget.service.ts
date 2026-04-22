import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  WidgetMapping,
  WidgetsSettings,
  WidgetPosition,
} from '../types/widget-config';
import { SEARCH_WIDGETS_SETTINGS } from '../../../features/search/config/widgets.config';
import { DETAILS_WIDGETS_SETTINGS } from '../../../features/details/config/widgets.config';
import { WidgetsByPosition } from '../types/widgets-by-position';

@Injectable({ providedIn: 'root' })
export class WidgetService {
  private router = inject(Router);

  getCurrentSettings(): WidgetsSettings {
    const url = this.router.url;
    return url.startsWith('/details')
      ? DETAILS_WIDGETS_SETTINGS
      : SEARCH_WIDGETS_SETTINGS;
  }

  getWidgetsForProperty(property: string): WidgetMapping[] {
    const settings = this.getCurrentSettings();
    const widgets = settings.mappings.filter((m: WidgetMapping) =>
      m.properties.includes(property),
    );
    return widgets.length > 0 ? widgets : [settings.defaultWidget];
  }

  getWidgetsByPosition(properties: string[]): WidgetsByPosition {
    const settings = this.getCurrentSettings();
    const { hiddenProperties, widgetOrderById } = settings;

    const filterHiddenProperties = (properties: string[]): string[] => {
      if (hiddenProperties) {
        return properties.filter((prop) => !hiddenProperties.includes(prop));
      }
      return properties;
    };

    const collectWidgetsForProperties = (
      properties: string[],
    ): Array<{ property: string; widget: WidgetMapping }> => {
      const widgets: Array<{ property: string; widget: WidgetMapping }> = [];
      properties.forEach((property) => {
        this.getWidgetsForProperty(property).forEach((widget) => {
          widgets.push({ property, widget });
        });
      });
      return widgets;
    };

    const orderAndFilterWidgets = (
      widgets: Array<{ property: string; widget: WidgetMapping }>,
    ): Array<{ property: string; widget: WidgetMapping }> => {
      if (!widgetOrderById || widgetOrderById.length === 0) {
        return widgets.sort((a, b) => a.property.localeCompare(b.property));
      }

      const orderedWidgets: Array<{ property: string; widget: WidgetMapping }> =
        [];
      const widgetMap = new Map<
        string,
        Array<{ property: string; widget: WidgetMapping }>
      >();

      // Group widgets by ID
      widgets.forEach((item) => {
        const id = item.widget.id || '';
        if (!widgetMap.has(id)) {
          widgetMap.set(id, []);
        }
        widgetMap.get(id)!.push(item);
      });

      // Process widgetOrder
      widgetOrderById.forEach((orderId) => {
        if (orderId === '*') {
          // Add all remaining widgets not yet added
          widgetMap.forEach((items, id) => {
            if (!widgetOrderById.includes(id) || id === '') {
              orderedWidgets.push(...items);
            }
          });
        } else if (widgetMap.has(orderId)) {
          orderedWidgets.push(...widgetMap.get(orderId)!);
        }
      });

      return orderedWidgets;
    };

    const groupWidgetsByPosition = (
      widgets: Array<{ property: string; widget: WidgetMapping }>,
    ): WidgetsByPosition => {
      const byPosition: WidgetsByPosition = {
        top: [],
        left: [],
        main: [],
        right: [],
        bottom: [],
      };

      widgets.forEach(({ property, widget }) => {
        const position = widget.config?.position || 'main';
        byPosition[position].push({ property, widget });
      });

      return byPosition;
    };

    const visibleProperties: string[] = filterHiddenProperties(properties);
    const collectedWidgets: Array<{ property: string; widget: WidgetMapping }> =
      collectWidgetsForProperties(visibleProperties);
    const orderedWidgets: Array<{ property: string; widget: WidgetMapping }> =
      orderAndFilterWidgets(collectedWidgets);
    return groupWidgetsByPosition(orderedWidgets);
  }
}
