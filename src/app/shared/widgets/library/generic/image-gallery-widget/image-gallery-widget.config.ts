import { BaseWidgetConfig } from '../../../types/widget-config';

export interface ImageGalleryWidgetConfig extends BaseWidgetConfig {
  maxThumbnails?: number;
  enableLightbox?: boolean;
}
