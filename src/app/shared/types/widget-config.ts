import { Type } from '@angular/core';
import { BaseWidget } from '../components/widgets/base-widget';

export interface WidgetsSettings {
  mappings: WidgetMapping[];
  defaultWidget: WidgetMapping;
  propertyOrder?: string[];
  hiddenProperties?: string[];
  includedProperties?: string[];
}

export interface WidgetMapping {
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
  position?: WidgetPosition;
}
