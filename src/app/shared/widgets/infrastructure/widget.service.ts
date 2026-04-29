import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  WidgetMapping,
  WidgetsSettings,
  WidgetPosition,
} from '../types/widget-config';
import { SEARCH_WIDGETS_SETTINGS } from '../../../features/search/config/widgets.config';
import { DETAILS_WIDGETS_SETTINGS } from '../../../features/details/config/widgets.config';
import {
  WidgetsByPosition,
  WidgetGroup as WidgetGroupByPosition,
} from '../types/widgets-by-position';

@Injectable({ providedIn: 'root' })
export class WidgetService {
  private router = inject(Router);

  getCurrentSettings(): WidgetsSettings {
    const url = this.router.url;
    return url.startsWith('/details')
      ? DETAILS_WIDGETS_SETTINGS
      : SEARCH_WIDGETS_SETTINGS;
  }

  getWidgetsByPosition(
    properties: string[],
    widgetsSettings: WidgetsSettings,
  ): WidgetsByPosition {
    const { hiddenProperties, widgetOrder, hiddenWidgetsById } =
      widgetsSettings;

    const filterHiddenProperties = (properties: string[]): string[] => {
      if (hiddenProperties) {
        return properties.filter((prop) => !hiddenProperties.includes(prop));
      }
      return properties;
    };

    const filterHiddenWidgets = (
      widgets: Array<{ property: string; widget: WidgetMapping }>,
    ): Array<{ property: string; widget: WidgetMapping }> => {
      if (hiddenWidgetsById && hiddenWidgetsById.length > 0) {
        return widgets.filter(
          (item) => !hiddenWidgetsById.includes(item.widget.id || ''),
        );
      }
      return widgets;
    };

    const collectWidgetsForProperties = (
      properties: string[],
    ): Array<{ property: string; widget: WidgetMapping }> => {
      const widgets: Array<{ property: string; widget: WidgetMapping }> = [];

      const getWidgetsForProperty = (property: string): WidgetMapping[] => {
        const widgets = widgetsSettings.mappings.filter((m) =>
          m.properties.includes(property),
        );
        return widgets.length > 0 ? widgets : [widgetsSettings.defaultWidget];
      };

      properties.forEach((property) => {
        getWidgetsForProperty(property).forEach((widget) => {
          widgets.push({ property, widget });
        });
      });
      return widgets;
    };

    const orderAndGroupWidgets = (
      widgets: Array<{ property: string; widget: WidgetMapping }>,
    ): WidgetGroupByPosition[] => {
      if (!widgetOrder || widgetOrder.length === 0) {
        return [
          {
            items: widgets.sort((a, b) => a.property.localeCompare(b.property)),
          },
        ];
      }

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

      // Collect all widget IDs from all groups for checking
      const allOrderedIds = new Set<string>();
      widgetOrder.forEach((group) => {
        group.widgetIds.forEach((id) => allOrderedIds.add(id));
      });

      const groupedWidgets: WidgetGroupByPosition[] = [];

      // Process widgetOrder groups
      widgetOrder.forEach((group) => {
        const groupItems: Array<{ property: string; widget: WidgetMapping }> =
          [];

        group.widgetIds.forEach((widgetId) => {
          if (widgetId === '*') {
            // Add all remaining widgets not yet added
            widgetMap.forEach((items, id) => {
              if (!allOrderedIds.has(id) || id === '') {
                groupItems.push(...items);
              }
            });
          } else if (widgetMap.has(widgetId)) {
            groupItems.push(...widgetMap.get(widgetId)!);
          }
        });

        if (groupItems.length > 0) {
          groupedWidgets.push({
            label: group.label,
            items: groupItems,
          });
        }
      });

      return groupedWidgets;
    };

    const groupWidgetsByPosition = (
      groups: WidgetGroupByPosition[],
    ): WidgetsByPosition => {
      const byPosition: WidgetsByPosition = {
        top: [],
        left: [],
        main: [],
        right: [],
        bottom: [],
      };

      groups.forEach((group) => {
        const positionGroups: Record<
          WidgetPosition,
          Array<{ property: string; widget: WidgetMapping }>
        > = {
          top: [],
          left: [],
          main: [],
          right: [],
          bottom: [],
        };

        group.items.forEach(({ property, widget }) => {
          const position = widget.config?.position || 'main';
          positionGroups[position].push({ property, widget });
        });

        Object.entries(positionGroups).forEach(([position, items]) => {
          const hasItemsForPosition = items.length > 0;
          if (hasItemsForPosition) {
            byPosition[position as WidgetPosition].push({
              label: group.label,
              items,
            });
          }
        });
      });

      return byPosition;
    };

    const visibleProperties: string[] = filterHiddenProperties(properties);
    const collectedWidgets: Array<{ property: string; widget: WidgetMapping }> =
      collectWidgetsForProperties(visibleProperties);
    const filteredWidgets: Array<{ property: string; widget: WidgetMapping }> =
      filterHiddenWidgets(collectedWidgets);
    const groupedWidgets: WidgetGroupByPosition[] =
      orderAndGroupWidgets(filteredWidgets);
    return groupWidgetsByPosition(groupedWidgets);
  }
}
