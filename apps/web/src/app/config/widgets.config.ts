import { WidgetConfig, WidgetMapping } from '../shared/types/widget-config';
import { TextWidget } from '../shared/components/widgets/text-widget/text-widget.component';
import { JsonWidget } from '../shared/components/widgets/json-widget/json-widget.component';
import { BadgeWidget } from '../shared/components/widgets/badge-widget/badge-widget.component';
import { MapWidget } from '../shared/components/widgets/map-widget/map-widget.component';

export const WIDGET_CONFIG: WidgetConfig = [
  {
    component: BadgeWidget,
    properties: ['@type'],
    config: {
      showPropertyLabel: false,
    },
  },
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
  {
    component: MapWidget,
    properties: ['birthPlace'],
    config: {},
  },
];

export const DEFAULT_WIDGET: WidgetMapping = {
  component: JsonWidget,
  properties: [],
  config: {},
};

export const PROPERTY_ORDER: string[] = [
  'label',
  '@id',
  '@type',
  'description',
];

export const HIDDEN_PROPERTIES: string[] = ['@id'];
