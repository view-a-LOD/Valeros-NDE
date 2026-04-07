import { WidgetConfig, WidgetMapping } from '../shared/types/widget-config';
import { TextWidget } from '../shared/components/widgets/text-widget/text-widget.component';
import { JsonWidget } from '../shared/components/widgets/json-widget/json-widget.component';

export const WIDGET_CONFIG: WidgetConfig = [
  {
    component: TextWidget,
    properties: ['label'],
    config: {
      showPropertyLabel: false,
      asHeader: true,
    },
  },
  {
    component: TextWidget,
    properties: ['description'],
    config: {},
  },
];

export const DEFAULT_WIDGET: WidgetMapping = {
  component: JsonWidget,
  properties: [],
  config: {},
};

export const PROPERTY_ORDER: string[] = [
  '@id',
  '@type',
  'label',
  'description',
];
