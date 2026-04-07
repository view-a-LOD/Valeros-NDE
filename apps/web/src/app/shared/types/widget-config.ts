import { Type } from '@angular/core';
import { BaseWidget } from '../components/widgets/base-widget';

export interface BaseWidgetConfig {
  showPropertyLabel?: boolean;
  propertyLabel?: string;
  propertyPath?: string;
}

export interface WidgetMapping {
  component: Type<BaseWidget>;
  properties: string[];
  config?: WidgetConfig;
}

export type WidgetMappingConfig = WidgetMapping[];

export type WidgetConfig = BaseWidgetConfig & Record<string, unknown>;
