import { Type } from '@angular/core';
import { BaseWidget } from '../components/widgets/base-widget';

export interface WidgetMapping {
  component: Type<BaseWidget>;
  properties: string[];
  config?: Record<string, unknown>;
}

export type WidgetConfig = WidgetMapping[];
