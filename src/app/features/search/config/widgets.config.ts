import { WidgetsSettings } from '../../../shared/widgets/types/widget-config';
import { JsonWidget } from '../../../shared/widgets/library/generic/json-widget/json-widget.component';
import { ImageGalleryWidget } from '../../../shared/widgets/library/generic/image-gallery-widget/image-gallery-widget.component';
import { MapWidget } from '../../../shared/widgets/library/generic/map-widget/map-widget.component';
import { AddressWidget } from '../../../shared/widgets/library/domain-specific/address-widget/address-widget.component';
import { DatasetWidget } from '../../../shared/widgets/library/domain-specific/dataset-widget/dataset-widget.component';
import { LinkWidget } from '../../../shared/widgets/library/generic/link-widget/link-widget.component';
import {
  featherAlignLeft,
  featherArchive,
  featherArrowRight,
  featherArrowUpRight,
  featherCalendar,
  featherCornerDownRight,
  featherCornerUpRight,
  featherExternalLink,
  featherFileText,
  featherGrid,
  featherHome,
  featherInfo,
  featherMapPin,
  featherPackage,
  featherTag,
  featherUser,
  featherUsers,
} from '@ng-icons/feather-icons';

export const BASE_WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [
    {
      id: 'dataset',
      properties: ['isPartOf'],
      component: DatasetWidget,
      config: {
        propertyLabel: 'Dataset',
        icon: featherArchive,
      },
    },
    {
      id: 'license',
      properties: ['isPartOf'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Licentie',
        propertyPath: 'license',
        icon: featherFileText,
      },
    },
    {
      id: 'publisher',
      properties: ['isPartOf'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Uitgever',
        propertyPath: 'publisher',
        icon: featherUsers,
      },
    },
    {
      id: 'genre',
      properties: ['genre'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Genre',
        icon: featherTag,
      },
    },
    {
      id: 'about',
      properties: ['about'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Over',
        icon: featherInfo,
      },
    },
    {
      id: 'is-based-on',
      properties: ['isBasedOn'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Gebaseerd op',
        icon: featherExternalLink,
      },
    },

    {
      id: 'content-location',
      properties: ['contentLocation', 'location'],
      component: MapWidget,
      config: {
        propertyLabel: 'Locatie',
        icon: featherMapPin,
        showOriginalLink: true,
      },
    },
    {
      id: 'birth-place',
      properties: ['birthPlace'],
      component: MapWidget,
      config: {
        propertyLabel: 'Geboorteplaats',
        icon: featherMapPin,
        showOriginalLink: true,
      },
    },
    {
      id: 'death-place',
      properties: ['deathPlace'],
      component: MapWidget,
      config: {
        propertyLabel: 'Plaats van overlijden',
        icon: featherMapPin,
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
        icon: featherGrid,
      },
    },
    {
      id: 'additional-type',
      properties: ['additionalType'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Soort (aanvullend)',
        propertyPath: 'name',
        icon: featherGrid,
      },
    },
    {
      id: 'material',
      properties: ['material'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Materiaal',
        icon: featherPackage,
      },
    },
    {
      id: 'creator',
      properties: ['creator'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Vervaardiger',
        icon: featherUser,
      },
    },
    {
      id: 'date-created',
      properties: ['dateCreated'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Vervaardigingsdatum',
        icon: featherCalendar,
      },
    },
    {
      id: 'birth-date',
      properties: ['birthDate'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Geboortedatum',
        icon: featherCalendar,
      },
    },
    {
      id: 'death-date',
      properties: ['deathDate'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Overlijdensdatum',
        icon: featherCalendar,
      },
    },
    {
      id: 'description',
      properties: ['description'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Beschrijving',
        icon: featherAlignLeft,
      },
    },
    {
      id: 'description-without-label',
      properties: ['description'],
      component: LinkWidget,
      config: {
        propertyLabel: 'Beschrijving',
        showPropertyLabel: false,
        maxLength: 200,
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
        icon: featherHome,
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

export const LIST_VIEW_WIDGETS_SETTINGS: WidgetsSettings = {
  ...BASE_WIDGETS_SETTINGS,
  mappings: [
    ...BASE_WIDGETS_SETTINGS.mappings,
    {
      id: 'image-thumb-left',
      properties: ['associatedMedia'],
      component: ImageGalleryWidget,
      config: {
        showPropertyLabel: false,
        position: 'left',
        maxThumbnails: 1,
        enableLightbox: false,
        fullWidth: true,
      },
    },
    {
      id: 'dataset-without-label',
      properties: ['isPartOf'],
      component: DatasetWidget,
      config: {
        showPropertyLabel: false,
      },
    },
  ],
  widgetOrder: [
    {
      widgetIds: [
        'image-thumb-left',
        'name',
        'description-without-label',
        // 'dataset-without-label',
      ],
    },
  ],
};

export const GRID_VIEW_WIDGETS_SETTINGS: WidgetsSettings = {
  ...BASE_WIDGETS_SETTINGS,
  widgetOrder: [
    {
      widgetIds: [
        'image-thumb',
        // 'name',
        // 'description-without-label'
      ],
    },
  ],
};

export const MAP_VIEW_WIDGETS_SETTINGS: WidgetsSettings = {
  ...BASE_WIDGETS_SETTINGS,
  widgetOrder: [
    {
      widgetIds: ['image-thumb', 'name', 'description-without-label'],
    },
  ],
};
