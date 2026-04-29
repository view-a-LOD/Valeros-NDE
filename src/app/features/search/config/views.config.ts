import { featherGrid, featherList, featherX } from '@ng-icons/feather-icons';
import { ViewsSettings } from '../views/types/view-config';
import { MasonryViewComponent } from '../views/library/masonry-view/masonry-view.component';
import { ListViewComponent } from '../views/library/list-view/list-view.component';

export const SEARCH_VIEWS_CONFIG: ViewsSettings = {
  mappings: [
    {
      type: 'list',
      component: ListViewComponent,
      config: {
        pageSize: 5,
        showPagination: true,
        showResultsCount: true,
      },
      icon: featherList,
      label: 'Lijst weergave',
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
    },
  ],
  defaultView: 'list',
};
