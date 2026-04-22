import { Component, computed } from '@angular/core';
import { TextWidgetConfig } from './text-widget.config';
import { BaseWidget } from '../../../infrastructure/base-widget';

@Component({
  selector: 'app-text-widget',

  imports: [],
  templateUrl: './text-widget.component.html',
})
export class TextWidget extends BaseWidget {
  asHeader = computed(() => {
    return (this.config() as TextWidgetConfig).asHeader === true;
  });
}
