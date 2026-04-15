import { WidgetsSettings } from '../shared/types/widget-config';
import { TextWidget } from '../shared/components/widgets/text-widget/text-widget.component';
import { JsonWidget } from '../shared/components/widgets/json-widget/json-widget.component';
import { BadgeWidget } from '../shared/components/widgets/badge-widget/badge-widget.component';
import { BirthplaceWidget } from '../custom-widgets/birthplace-widget/birthplace-widget.component';
import { ImageGalleryWidget } from '../shared/components/widgets/image-gallery-widget/image-gallery-widget.component';
import { MapWidget } from '../shared/components/widgets/map-widget/map-widget.component';
import { IiifWidget } from '../shared/components/widgets/iiif-widget/iiif-widget.component';
import { LinkWidget } from '../shared/components/widgets/link-widget/link-widget.component';

export const WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [
    {
      properties: ['associatedMedia'],
      component: ImageGalleryWidget,
      config: {
        showPropertyLabel: false,
        position: 'left',
      },
    },
    // {
    //   properties: ['associatedMedia'],
    //   component: IiifWidget,
    //   config: {
    //     showPropertyLabel: false,
    //     position: 'left',
    //   },
    // },
    {
      properties: ['name'],
      component: TextWidget,
      config: {
        showPropertyLabel: false,
        asHeader: true,
        position: 'top',
      },
    },
    {
      properties: ['type'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Soort',
        // showPropertyLabel: false,
      },
    },
    {
      properties: ['additionalType'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Soort (aanvullend)',
        propertyPath: 'name',
        // showPropertyLabel: false,
      },
    },
    {
      properties: ['material'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Materiaal',
        propertyPath: 'name',
        // showPropertyLabel: false,
      },
    },
    {
      properties: ['isPartOf'],
      component: JsonWidget,
      config: {
        propertyLabel: 'isPartOf',
      },
    },
    {
      properties: ['creator'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Vervaardiger',
      },
    },
    {
      properties: ['dateCreated'],
      component: TextWidget,
      config: {
        propertyLabel: 'Vervaardigingsdatum',
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
      properties: ['geo'],
      component: MapWidget,
      config: {
        // showPropertyLabel: false,
      },
    },
  ],
  defaultWidget: {
    component: LinkWidget,
    properties: [],
    config: {},
  },
  propertyOrder: ['name', 'type', 'additionalType', 'description'],
  includedProperties: [
    'name',
    'additionalType',
    'description',
    'associatedMedia',
  ],
};

export const DETAILS_WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [...WIDGETS_SETTINGS.mappings],
  defaultWidget: {
    component: LinkWidget,
    properties: [],
    config: {},
  },
  propertyOrder: WIDGETS_SETTINGS.propertyOrder
    ? [...WIDGETS_SETTINGS.propertyOrder]
    : [],
  hiddenProperties: ['id'],
};
