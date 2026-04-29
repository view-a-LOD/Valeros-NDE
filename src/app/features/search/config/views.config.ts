import { featherGrid, featherList, featherX } from '@ng-icons/feather-icons';
import { ViewsSettings } from '../views/types/view-config';
import { MasonryViewComponent } from '../views/library/masonry-view/masonry-view.component';
import { ListViewComponent } from '../views/library/list-view/list-view.component';
import {
  GRID_VIEW_WIDGETS_SETTINGS,
  LIST_VIEW_WIDGETS_SETTINGS,
} from './widgets.config';
import { config } from 'rxjs';
import { ImageGalleryWidget } from '../../../shared/widgets/library/generic/image-gallery-widget/image-gallery-widget.component';
import { DatasetWidget } from '../../../shared/widgets/library/domain-specific/dataset-widget/dataset-widget.component';
import { LinkWidget } from '../../../shared/widgets/library/generic/link-widget/link-widget.component';

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
  ],
  defaultView: 'list',
};
