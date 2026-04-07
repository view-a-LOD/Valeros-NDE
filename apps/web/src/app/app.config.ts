import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { WIDGET_CONFIG, DEFAULT_WIDGET } from './config/widgets.config';
import {
  WIDGET_CONFIG_TOKEN,
  DEFAULT_WIDGET_TOKEN,
} from './shared/services/widget.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    { provide: WIDGET_CONFIG_TOKEN, useValue: WIDGET_CONFIG },
    { provide: DEFAULT_WIDGET_TOKEN, useValue: DEFAULT_WIDGET },
  ],
};
