import { Route } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
