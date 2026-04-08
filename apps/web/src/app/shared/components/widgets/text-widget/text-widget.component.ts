import { Component, computed } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { HighlightedTextComponent } from '../../highlighted-text/highlighted-text.component';
import { TextWidgetConfig } from './text-widget.config';

@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [HighlightedTextComponent],
  templateUrl: './text-widget.component.html',
})
export class TextWidget extends BaseWidget {
  asHeader = computed(() => {
    return (this.config() as TextWidgetConfig).asHeader === true;
  });
}
