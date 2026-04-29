import { Type } from '@angular/core';
import { IconType } from '@ng-icons/core';
import { BaseResultsView } from '../infrastructure/base-results-view';
import { ViewType } from './view-type';
import { WidgetsSettings } from '../../../../shared/widgets/types/widget-config';

export interface BaseViewConfig {
  pageSize?: number;
  showPagination?: boolean;
  showResultsCount?: boolean;
}

export type ViewConfig = BaseViewConfig & Record<string, unknown>;

export interface ViewMapping {
  type: ViewType;
  component: Type<BaseResultsView>;
  config: ViewConfig;
  icon: IconType;
  label: string;
  widgetsSettings: WidgetsSettings;
}

export interface ViewsSettings {
  mappings: ViewMapping[];
  defaultView: ViewType;
}
