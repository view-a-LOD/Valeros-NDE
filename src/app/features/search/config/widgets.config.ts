import { WidgetsSettings } from '../../../shared/widgets/types/widget-config';
import { JsonWidget } from '../../../shared/widgets/library/generic/json-widget/json-widget.component';
import { ImageGalleryWidget } from '../../../shared/widgets/library/generic/image-gallery-widget/image-gallery-widget.component';
import { MapWidget } from '../../../shared/widgets/library/generic/map-widget/map-widget.component';
import { AddressWidget } from '../../../shared/widgets/library/domain-specific/address-widget/address-widget.component';
import { DatasetWidget } from '../../../shared/widgets/library/domain-specific/dataset-widget/dataset-widget.component';
import { LinkWidget } from '../../../shared/widgets/library/generic/link-widget/link-widget.component';

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
      component: LinkWidget,
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
      component: MapWidget,
      config: {
        propertyLabel: 'Locatie',
        showOriginalLink: true,
      },
    },
    {
      id: 'birth-place',
      properties: ['birthPlace'],
      component: MapWidget,
      config: {
        propertyLabel: 'Geboorteplaats',
        showOriginalLink: true,
      },
    },
    {
      id: 'death-place',
      properties: ['deathPlace'],
      component: MapWidget,
      config: {
        propertyLabel: 'Plaats van overlijden',
        showOriginalLink: true,
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
      component: LinkWidget,
      config: {
        showPropertyLabel: false,
        asHeader: true,
      },
    },
    {
      id: 'type',
      properties: ['type'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Soort',
      },
    },
    {
      id: 'additional-type',
      properties: ['additionalType'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Soort (aanvullend)',
        propertyPath: 'name',
      },
    },
    {
      id: 'material',
      properties: ['material'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Materiaal',
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
      component: LinkWidget,
      config: {
        propertyLabel: 'Vervaardigingsdatum',
      },
    },
    {
      id: 'birth-date',
      properties: ['birthDate'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Geboortedatum',
      },
    },
    {
      id: 'death-date',
      properties: ['deathDate'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Overlijdensdatum',
      },
    },
    {
      id: 'description',
      properties: ['description'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Beschrijving',
      },
    },
    {
      id: 'description-without-label',
      properties: ['description'],
      component: LinkWidget,
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
  widgetOrder: [
    {
      widgetIds: ['image-thumb', 'name', 'description-without-label'],
    },
  ],
};
