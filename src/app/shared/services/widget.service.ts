import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  WidgetMapping,
  WidgetsSettings,
  WidgetPosition,
} from '../types/widget-config';
import {
  WIDGETS_SETTINGS,
  DETAILS_WIDGETS_SETTINGS,
} from '../../config/widgets.settings';
import { WidgetsByPosition } from '../types/widgets-by-position';

@Injectable({ providedIn: 'root' })
export class WidgetService {
  private router = inject(Router);

  getCurrentSettings(): WidgetsSettings {
    const url = this.router.url;
    return url.startsWith('/details')
      ? DETAILS_WIDGETS_SETTINGS
      : WIDGETS_SETTINGS;
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
    const { includedProperties, hiddenProperties, widgetOrder } = settings;

    const filterVisibleProperties = (properties: string[]): string[] => {
      if (includedProperties && hiddenProperties) {
        return properties.filter(
          (property) =>
            includedProperties.includes(property) &&
            !hiddenProperties.includes(property),
        );
      }
      if (includedProperties) {
        return properties.filter((prop) => includedProperties.includes(prop));
      }
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

    const sortWidgetsBySettingsOrder = (
      widgets: Array<{ property: string; widget: WidgetMapping }>,
    ): Array<{ property: string; widget: WidgetMapping }> => {
      return widgets.sort((a, b) => {
        const idA = a.widget.id;
        const idB = b.widget.id;
        const indexA = idA && widgetOrder ? widgetOrder.indexOf(idA) : -1;
        const indexB = idB && widgetOrder ? widgetOrder.indexOf(idB) : -1;

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.property.localeCompare(b.property);
      });
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

    const visibleProperties: string[] = filterVisibleProperties(properties);
    const collectedWidgets: Array<{ property: string; widget: WidgetMapping }> =
      collectWidgetsForProperties(visibleProperties);
    const sortedWidgets: Array<{ property: string; widget: WidgetMapping }> =
      sortWidgetsBySettingsOrder(collectedWidgets);
    return groupWidgetsByPosition(sortedWidgets);
  }
}
