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
      properties: ['isPartOf'],
      component: DatasetWidget,
      config: {
        propertyLabel: 'Dataset',
      },
    },
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
      properties: ['birthDate'],
      component: TextWidget,
      config: {
        propertyLabel: 'Geboortedatum',
      },
    },
    {
      properties: ['deathDate'],
      component: TextWidget,
      config: {
        propertyLabel: 'Overlijdensdatum',
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
    {
      properties: ['address'],
      component: AddressWidget,
      config: {
        propertyLabel: 'Adres',
      },
    },
  ],
  defaultWidget: {
    component: LinkWidget,
    properties: [],
    config: {},
  },
  propertyOrder: ['name', 'isPartOf', 'type', 'additionalType', 'description'],
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
