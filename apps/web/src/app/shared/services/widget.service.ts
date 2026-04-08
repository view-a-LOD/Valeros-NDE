import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetMapping, WidgetsSettings } from '../types/widget-config';
import {
  WIDGETS_SETTINGS,
  DETAILS_WIDGETS_SETTINGS,
} from '../../config/widgets.settings';

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
}
