import { featherGrid, featherList, featherMap } from '@ng-icons/feather-icons';
import { ViewsSettings } from '../views/types/view-config';
import { MasonryViewComponent } from '../views/library/masonry-view/masonry-view.component';
import { ListViewComponent } from '../views/library/list-view/list-view.component';
import { MapViewComponent } from '../views/library/map-view/map-view.component';
import {
  GRID_VIEW_WIDGETS_SETTINGS,
  LIST_VIEW_WIDGETS_SETTINGS,
  MAP_VIEW_WIDGETS_SETTINGS,
} from './widgets.config';

export const SEARCH_VIEWS_CONFIG: ViewsSettings = {
  mappings: [
    {
      type: 'list',
      component: ListViewComponent,
      config: {
        pageSize: 20,
        showPagination: true,
        showResultsCount: true,
      },
      icon: featherList,
      label: 'Lijst weergave',
      widgetsSettings: LIST_VIEW_WIDGETS_SETTINGS,
    },
    {
      type: 'grid',
      component: MasonryViewComponent,
      config: {
        pageSize: 20,
        showPagination: true,
        showResultsCount: true,
      },
      icon: featherGrid,
      label: 'Grid weergave',
      widgetsSettings: GRID_VIEW_WIDGETS_SETTINGS,
    },
    {
      type: 'map',
      component: MapViewComponent,
      config: {
        pageSize: 100,
        showPagination: false,
        showResultsCount: true,
        showSort: false,
      },
      icon: featherMap,
      label: 'Kaart weergave',
      widgetsSettings: MAP_VIEW_WIDGETS_SETTINGS,
    },
  ],
  defaultView: 'list',
};
