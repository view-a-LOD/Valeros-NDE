import { WidgetsSettings } from '../shared/types/widget-config';
import { TextWidget } from '../shared/components/widgets/text-widget/text-widget.component';
import { JsonWidget } from '../shared/components/widgets/json-widget/json-widget.component';
import { BadgeWidget } from '../shared/components/widgets/badge-widget/badge-widget.component';
import { BirthplaceWidget } from '../custom-widgets/birthplace-widget/birthplace-widget.component';
import { ImageGalleryWidget } from '../shared/components/widgets/image-gallery-widget/image-gallery-widget.component';
import { MapWidget } from '../shared/components/widgets/map-widget/map-widget.component';
import { IiifWidget } from '../shared/components/widgets/iiif-widget/iiif-widget.component';
import { LinkWidget } from '../shared/components/widgets/link-widget/link-widget.component';
import { AddressWidget } from '../shared/components/widgets/address-widget/address-widget.component';
import { DatasetWidget } from '../shared/components/widgets/dataset-widget/dataset-widget.component';

export const WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [
    {
      id: 'dataset',
      properties: ['isPartOf'],
      component: DatasetWidget,
      config: {
        propertyLabel: 'Dataset',
      },
    },
    {
      id: 'license',
      properties: ['isPartOf'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Licentie',
        propertyPath: 'license',
      },
    },
    {
      id: 'publisher',
      properties: ['isPartOf'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Uitgever',
        propertyPath: 'publisher',
      },
    },
    {
      id: 'image-gallery',
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
      id: 'name',
      properties: ['name'],
      component: TextWidget,
      config: {
        showPropertyLabel: false,
        asHeader: true,
        position: 'top',
      },
    },
    {
      id: 'type',
      properties: ['type'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Soort',
        // showPropertyLabel: false,
      },
    },
    {
      id: 'additional-type',
      properties: ['additionalType'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Soort (aanvullend)',
        propertyPath: 'name',
        // showPropertyLabel: false,
      },
    },
    {
      id: 'material',
      properties: ['material'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Materiaal',
        propertyPath: 'name',
        // showPropertyLabel: false,
      },
    },
    {
      id: 'creator',
      properties: ['creator'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Vervaardiger',
      },
    },
    {
      id: 'date-created',
      properties: ['dateCreated'],
      component: TextWidget,
      config: {
        propertyLabel: 'Vervaardigingsdatum',
      },
    },
    {
      id: 'birth-date',
      properties: ['birthDate'],
      component: TextWidget,
      config: {
        propertyLabel: 'Geboortedatum',
      },
    },
    {
      id: 'death-date',
      properties: ['deathDate'],
      component: TextWidget,
      config: {
        propertyLabel: 'Overlijdensdatum',
      },
    },
    {
      id: 'description',
      properties: ['description'],
      component: TextWidget,
      config: {
        propertyLabel: 'Beschrijving',
      },
    },
    {
      id: 'geo',
      properties: ['geo'],
      component: MapWidget,
      config: {
        // showPropertyLabel: false,
      },
    },
    {
      id: 'address',
      properties: ['address'],
      component: AddressWidget,
      config: {
        propertyLabel: 'Adres',
      },
    },
  ],
  defaultWidget: {
    component: JsonWidget,
    properties: [],
    config: {},
  },
  widgetOrderById: [
    'name',
    'image-gallery',
    'dataset',
    'type',
    'additional-type',
    'description',
  ],
};

export const DETAILS_WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [...WIDGETS_SETTINGS.mappings],
  defaultWidget: {
    component: JsonWidget,
    properties: [],
    config: {},
  },
  widgetOrderById: WIDGETS_SETTINGS.widgetOrderById
    ? [
        'name',
        'image-gallery',
        'dataset',
        'type',
        'additional-type',
        'description',
        '*',
        'license',
        'publisher',
      ]
    : [],
  hiddenProperties: ['id'],
};
