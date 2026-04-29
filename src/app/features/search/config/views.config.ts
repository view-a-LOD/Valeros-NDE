import { featherGrid, featherX } from '@ng-icons/feather-icons';
import { ViewsSettings } from '../views/types/view-config';
import { MasonryViewComponent } from '../views/library/masonry-view/masonry-view.component';

export const SEARCH_VIEWS_CONFIG: ViewsSettings = {
  mappings: [
    {
      type: 'masonry',
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
  defaultView: 'masonry',
};
