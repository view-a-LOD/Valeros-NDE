import { Component, computed } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { TextWidgetConfig } from './text-widget.config';

@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [],
  templateUrl: './text-widget.component.html',
})
export class TextWidget extends BaseWidget {
  asHeader = computed(() => {
    return (this.config() as TextWidgetConfig).asHeader === true;
  });
}
