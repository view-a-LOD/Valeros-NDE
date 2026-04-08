import { WidgetsSettings } from '../shared/types/widget-config';
import { TextWidget } from '../shared/components/widgets/text-widget/text-widget.component';
import { JsonWidget } from '../shared/components/widgets/json-widget/json-widget.component';
import { BadgeWidget } from '../shared/components/widgets/badge-widget/badge-widget.component';
import { BirthplaceWidget } from '../custom-widgets/birthplace-widget/birthplace-widget.component';
import { ImageWidget } from '../shared/components/widgets/image-widget/image-widget.component';
import { MapWidget } from '../shared/components/widgets/map-widget/map-widget.component';
import { IiifWidget } from '../shared/components/widgets/iiif-widget/iiif-widget.component';

export const WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [
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
      properties: ['description'],
      component: TextWidget,
      config: {
        propertyLabel: 'Beschrijving',
      },
    },
  ],
  defaultWidget: {
    component: JsonWidget,
    properties: [],
    config: {},
  },
  propertyOrder: ['name', 'type', 'description'],
  includedProperties: ['name', 'type', 'description'],
};

export const DETAILS_WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [
    ...WIDGETS_SETTINGS.mappings,
    {
      properties: ['associatedMedia'],
      component: ImageWidget,
      config: {
        propertyPath: 'thumbnailUrl',
        propertyLabel: 'Afbeelding',
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
  ],
  defaultWidget: {
    component: JsonWidget,
    properties: [],
    config: {},
  },
  hiddenProperties: ['id'],
  propertyOrder: ['name', 'type', 'description'],
};
