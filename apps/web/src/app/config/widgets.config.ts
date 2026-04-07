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
    component: BadgeWidget,
    properties: ['@type'],
    config: {
      propertyLabel: 'Soort',
      // showPropertyLabel: false,
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
    config: {
      propertyLabel: 'Beschrijving',
    },
  },
  {
    component: TextWidget,
    properties: ['birthPlace'],
    config: {
      propertyPath: 'label',
      propertyLabel: 'Geboorteplaats',
    },
  },
  {
    component: TextWidget,
    properties: ['birthPlace'],
    config: {
      showPropertyLabel: false,
      propertyPath: 'description',
    },
  },
  {
    component: MapWidget,
    properties: ['birthPlace'],
    config: {
      // propertyLabel: 'Kaart',
      showPropertyLabel: false,
    },
  },
  // {
  //   component: BirthplaceWidget,
  //   properties: ['birthPlace'],
  //   config: {
  //     propertyLabel: 'Geboorteplaats (kaart)',
  //   },
  // },
  {
    component: ImageWidget,
    properties: ['associatedMedia'],
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
