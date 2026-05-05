import { Type } from '@angular/core';
import { IconType } from '@ng-icons/core';
import { BaseWidget } from '../infrastructure/base-widget';

export interface WidgetsSettings {
  mappings: WidgetMapping[];
  defaultWidget: WidgetMapping;
  widgetOrder?: WidgetOrderGroup[];
  hiddenProperties?: string[];
  hiddenWidgetsById?: string[];
}

export interface WidgetOrderGroup {
  label?: string;
  widgetIds: string[];
}

export interface WidgetMapping {
  id?: string;
  component: Type<BaseWidget>;
  properties: string[];
  config?: WidgetConfig;
}

export type WidgetConfig = BaseWidgetConfig & Record<string, unknown>;

export type WidgetPosition = 'top' | 'left' | 'main' | 'right' | 'bottom';

export interface BaseWidgetConfig {
  showPropertyLabel?: boolean;
  propertyLabel?: string;
  propertyPath?: string;
  icon?: IconType;
  position?: WidgetPosition;
  fullWidth?: boolean;
  showOriginalLink?: boolean;
}
