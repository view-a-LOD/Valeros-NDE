import { WidgetsSettings } from '../../../lib/widgets/types/widget-config';
import { TextWidget } from '../../../lib/widgets/library/generic/text-widget/text-widget.component';
import { JsonWidget } from '../../../lib/widgets/library/generic/json-widget/json-widget.component';
import { BadgeWidget } from '../../../lib/widgets/library/generic/badge-widget/badge-widget.component';
import { BirthplaceWidget } from '../../../lib/widgets/library/domain-specific/birthplace-widget/birthplace-widget.component';
import { ImageGalleryWidget } from '../../../lib/widgets/library/generic/image-gallery-widget/image-gallery-widget.component';
import { MapWidget } from '../../../lib/widgets/library/generic/map-widget/map-widget.component';
import { IiifWidget } from '../../../lib/widgets/library/generic/iiif-widget/iiif-widget.component';
import { LinkWidget } from '../../../lib/widgets/library/generic/link-widget/link-widget.component';
import { AddressWidget } from '../../../lib/widgets/library/domain-specific/address-widget/address-widget.component';
import { DatasetWidget } from '../../../lib/widgets/library/domain-specific/dataset-widget/dataset-widget.component';
import { AsyncPreviewWidget } from '../../../lib/widgets/infrastructure/async-preview-widget/async-preview-widget.component';

export const SEARCH_WIDGETS_SETTINGS: WidgetsSettings = {
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
      component: LinkWidget,
      config: {
        propertyLabel: 'Licentie',
        propertyPath: 'license',
      },
    },
    {
      id: 'publisher',
      properties: ['isPartOf'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Uitgever',
        propertyPath: 'publisher',
      },
    },
    {
      id: 'genre',
      properties: ['genre'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Genre',
      },
    },
    {
      id: 'is-based-on',
      properties: ['isBasedOn'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Gebaseerd op',
      },
    },
    {
      id: 'content-location',
      properties: ['contentLocation', 'location'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Locatie',
      },
    },
    {
      id: 'content-location',
      properties: ['contentLocation', 'location'],
      component: AsyncPreviewWidget,
      config: {
        showPropertyLabel: false,
        previewComponent: MapWidget,
        previewProperty: 'geo',
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
      },
    },
    {
      id: 'additional-type',
      properties: ['additionalType'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Soort (aanvullend)',
        propertyPath: 'name',
      },
    },
    {
      id: 'material',
      properties: ['material'],
      component: BadgeWidget,
      config: {
        propertyLabel: 'Materiaal',
        propertyPath: 'name',
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
      config: {},
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
