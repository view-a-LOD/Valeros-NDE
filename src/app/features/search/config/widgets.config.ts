import { WidgetsSettings } from '../../../shared/widgets/types/widget-config';
import { TextWidget } from '../../../shared/widgets/library/generic/text-widget/text-widget.component';
import { JsonWidget } from '../../../shared/widgets/library/generic/json-widget/json-widget.component';
import { BadgeWidget } from '../../../shared/widgets/library/generic/badge-widget/badge-widget.component';
import { ImageGalleryWidget } from '../../../shared/widgets/library/generic/image-gallery-widget/image-gallery-widget.component';
import { MapWidget } from '../../../shared/widgets/library/generic/map-widget/map-widget.component';
import { LinkWidget } from '../../../shared/widgets/library/generic/link-widget/link-widget.component';
import { LinkOrLiteralWidget } from '../../../shared/widgets/library/generic/link-or-literal-widget/link-or-literal-widget.component';
import { AddressWidget } from '../../../shared/widgets/library/domain-specific/address-widget/address-widget.component';
import { DatasetWidget } from '../../../shared/widgets/library/domain-specific/dataset-widget/dataset-widget.component';
import { AsyncPreviewWidget } from '../../../shared/widgets/infrastructure/async-preview-widget/async-preview-widget.component';

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
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Licentie',
        propertyPath: 'license',
      },
    },
    {
      id: 'publisher',
      properties: ['isPartOf'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Uitgever',
        propertyPath: 'publisher',
      },
    },
    {
      id: 'genre',
      properties: ['genre'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Genre',
      },
    },
    {
      id: 'is-based-on',
      properties: ['isBasedOn'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Gebaseerd op',
      },
    },
    {
      id: 'content-location-link',
      properties: ['contentLocation', 'location'],
      component: LinkOrLiteralWidget,
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
      id: 'birth-place-link',
      properties: ['birthPlace'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Locatie',
      },
    },
    {
      id: 'birth-place',
      properties: ['birthPlace'],
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
      id: 'image-thumb',
      properties: ['associatedMedia'],
      component: ImageGalleryWidget,
      config: {
        showPropertyLabel: false,
        position: 'top',
        maxThumbnails: 1,
        enableLightbox: false,
        fullWidth: true,
      },
    },
    {
      id: 'name',
      properties: ['name'],
      component: LinkOrLiteralWidget,
      config: {
        showPropertyLabel: false,
        asHeader: true,
      },
    },
    {
      id: 'type',
      properties: ['type'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Soort',
      },
    },
    {
      id: 'additional-type',
      properties: ['additionalType'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Soort (aanvullend)',
        propertyPath: 'name',
      },
    },
    {
      id: 'material',
      properties: ['material'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Materiaal',
        propertyPath: 'name',
      },
    },
    {
      id: 'creator',
      properties: ['creator'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Vervaardiger',
      },
    },
    {
      id: 'date-created',
      properties: ['dateCreated'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Vervaardigingsdatum',
      },
    },
    {
      id: 'birth-date',
      properties: ['birthDate'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Geboortedatum',
      },
    },
    {
      id: 'death-date',
      properties: ['deathDate'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Overlijdensdatum',
      },
    },
    {
      id: 'description',
      properties: ['description'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Beschrijving',
      },
    },
    {
      id: 'description-without-label',
      properties: ['description'],
      component: LinkOrLiteralWidget,
      config: {
        propertyLabel: 'Beschrijving',
        showPropertyLabel: false,
        maxLength: 300,
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
  widgetOrderById: ['image-thumb', 'name', 'description-without-label'],
};
