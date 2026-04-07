import { Type } from '@angular/core';
import { BaseWidget } from '../components/widgets/base-widget';

export interface BaseWidgetConfig {
  showPropertyLabel?: boolean;
  propertyPath?: string;
}

export interface WidgetMapping {
  component: Type<BaseWidget>;
  properties: string[];
  config?: BaseWidgetConfig & Record<string, unknown>;
}

export type WidgetConfig = WidgetMapping[];
