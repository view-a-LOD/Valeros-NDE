import {
  WidgetMapping,
  WidgetMappingConfig,
} from '../shared/types/widget-config';
import { TextWidget } from '../shared/components/widgets/text-widget/text-widget.component';
import { JsonWidget } from '../shared/components/widgets/json-widget/json-widget.component';
import { BadgeWidget } from '../shared/components/widgets/badge-widget/badge-widget.component';
import { BirthplaceWidget } from '../custom-widgets/birthplace-widget/birthplace-widget.component';
import { ImageWidget } from '../shared/components/widgets/image-widget/image-widget.component';
import { MapWidget } from '../shared/components/widgets/map-widget/map-widget.component';

export const WIDGET_CONFIG: WidgetMappingConfig = [
  {
    properties: ['@type'],
    component: BadgeWidget,
    config: {
      propertyLabel: 'Soort',
      // showPropertyLabel: false,
    },
  },
  {
    properties: ['label'],
    component: TextWidget,
    config: {
      showPropertyLabel: false,
      asHeader: true,
    },
  },
  {
    properties: ['description'],
    component: TextWidget,
    config: {
      propertyLabel: 'Beschrijving',
    },
  },
  {
    properties: ['birthPlace'],
    component: TextWidget,
    config: {
      propertyPath: 'label',
      propertyLabel: 'Geboorteplaats',
    },
  },
  {
    properties: ['birthPlace'],
    component: TextWidget,
    config: {
      showPropertyLabel: false,
      propertyPath: 'description',
    },
  },
  {
    properties: ['birthPlace'],
    component: MapWidget,
    config: {
      // propertyLabel: 'Kaart',
      showPropertyLabel: false,
    },
  },
  // {
  //   properties: ['birthPlace'],
  //   component: BirthplaceWidget,
  //   config: {
  //     propertyLabel: 'Geboorteplaats (kaart)',
  //   },
  // },
  {
    properties: ['associatedMedia'],
    component: ImageWidget,
    config: {
      propertyPath: 'thumbnailUrl',
      propertyLabel: 'Afbeelding',
    },
  },
];

export const DEFAULT_WIDGET: WidgetMapping = {
  component: JsonWidget,
  properties: [],
  config: {},
};

export const PROPERTY_ORDER: string[] = ['label', '@type', 'description'];

export const HIDDEN_PROPERTIES: string[] = ['@id'];
