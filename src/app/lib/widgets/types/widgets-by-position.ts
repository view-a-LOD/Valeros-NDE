import { WidgetMapping, WidgetPosition } from './widget-config';

export type WidgetsByPosition = Record<
  WidgetPosition,
  Array<{ property: string; widget: WidgetMapping }>
>;
