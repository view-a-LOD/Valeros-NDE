import { WidgetsSettings } from '../../../shared/widgets/types/widget-config';
import { JsonWidget } from '../../../shared/widgets/library/generic/json-widget/json-widget.component';
import { SEARCH_WIDGETS_SETTINGS } from '../../search/config/widgets.config';

export const DETAILS_WIDGETS_SETTINGS: WidgetsSettings = {
  mappings: [...SEARCH_WIDGETS_SETTINGS.mappings],
  defaultWidget: {
    component: JsonWidget,
    properties: [],
    config: {},
  },
  widgetOrder: [
    {
      widgetIds: [
        'name',
        'image-gallery',
        'type',
        'additional-type',
        'description',
        '*',
        'license',
      ],
    },
    {
      label: 'Bronhouder',
      widgetIds: ['dataset', 'publisher'],
    },
  ],
  hiddenProperties: ['id'],
  hiddenWidgetsById: ['image-thumb', 'description-without-label'],
};
