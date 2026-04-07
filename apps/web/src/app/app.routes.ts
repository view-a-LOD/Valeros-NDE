import { Route } from '@angular/router';
import { DetailsComponent } from './features/details/components/details-page/details.component';
import { SearchPageComponent } from './features/search/components/search-page/search-page.component';

export const appRoutes: Route[] = [
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: SearchPageComponent,
  },
];
