import { Type } from '@angular/core';
import { BaseWidgetConfig } from '../../types/widget-config';
import { BaseWidget } from '../base-widget';

export interface AsyncPreviewWidgetConfig extends BaseWidgetConfig {
  idPath?: string;
  previewComponent: Type<BaseWidget>;
  previewProperty: string;
  previewPropertyPath?: string;
}

export function isAsyncPreviewConfig(
  config: BaseWidgetConfig,
): config is AsyncPreviewWidgetConfig {
  return (
    config &&
    typeof config === 'object' &&
    'previewComponent' in config &&
    'previewProperty' in config
  );
}
