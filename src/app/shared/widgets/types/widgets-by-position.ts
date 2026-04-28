import { WidgetMapping, WidgetPosition } from './widget-config';

export interface WidgetGroup {
  label?: string;
  items: Array<{ property: string; widget: WidgetMapping }>;
}

export type WidgetsByPosition = Record<WidgetPosition, WidgetGroup[]>;
