import { Injectable, inject, InjectionToken } from '@angular/core';
import { WidgetMapping } from '../types/widget-config';
import { WIDGETS_SETTINGS } from '../../config/widgets.settings';

@Injectable({ providedIn: 'root' })
export class WidgetService {
  getWidgetsForProperty(property: string): WidgetMapping[] {
    const mappings = WIDGETS_SETTINGS.mappings.filter((m: WidgetMapping) =>
      m.properties.includes(property),
    );
    return mappings.length > 0 ? mappings : [WIDGETS_SETTINGS.defaultWidget];
  }
}
