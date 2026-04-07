import { Injectable, inject, InjectionToken } from '@angular/core';
import { WidgetMapping, WidgetConfig } from '../types/widget-config';

export const WIDGET_CONFIG_TOKEN = new InjectionToken<WidgetConfig>(
  'WidgetConfig',
);
export const DEFAULT_WIDGET_TOKEN = new InjectionToken<WidgetMapping>(
  'DefaultWidget',
);

@Injectable({ providedIn: 'root' })
export class WidgetService {
  private config: WidgetConfig = inject(WIDGET_CONFIG_TOKEN);
  private defaultWidget: WidgetMapping = inject(DEFAULT_WIDGET_TOKEN);

  getWidgetsForProperty(property: string): WidgetMapping[] {
    const mappings = this.config.filter((m: WidgetMapping) =>
      m.properties.includes(property),
    );
    return mappings.length > 0 ? mappings : [this.defaultWidget];
  }
}
