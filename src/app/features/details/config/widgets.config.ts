import { WidgetsSettings } from '../../../shared/widgets/types/widget-config';
import { JsonWidget } from '../../../shared/widgets/library/generic/json-widget/json-widget.component';
import { SEARCH_WIDGETS_SETTINGS } from '../../search/config/widgets.config';
import { LinkWidget } from '../../../shared/widgets/library/generic/link-widget/link-widget.component';

export const DETAILS_WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [
    ...SEARCH_WIDGETS_SETTINGS.mappings,
    {
      id: 'description-header',
      properties: ['description'],
      component: LinkWidget,
      config: {
        showPropertyLabel: false,
        largeFont: true,
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
      widgetIds: ['name', 'description-header'],
    },
    {
      widgetIds: ['image-gallery', 'type', 'additional-type', '*', 'license'],
    },
    {
      label: 'Bronhouder',
      widgetIds: ['dataset', 'publisher'],
    },
  ],
  hiddenProperties: ['id'],
  hiddenWidgetsById: [
    'image-thumb',
    'description',
    'description-without-label',
  ],
};
