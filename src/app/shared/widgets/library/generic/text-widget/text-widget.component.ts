import { Component, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TextWidgetConfig } from './text-widget.config';
import { BaseWidget } from '../../../infrastructure/base-widget';
import { HighlightedTextComponent } from '../../../../node/highlighted-text/highlighted-text.component';
import { TruncatedTextComponent } from '../../../../node/truncated-text/truncated-text.component';

@Component({
  selector: 'app-text-widget',

  templateUrl: './text-widget.component.html',
  imports: [NgTemplateOutlet, HighlightedTextComponent, TruncatedTextComponent],
})
export class TextWidget extends BaseWidget {
  asHeader = computed(() => {
    return (this.config() as TextWidgetConfig).asHeader === true;
  });

  maxLength = computed(() => {
    return (this.config() as TextWidgetConfig).maxLength;
  });

  enableHighlights = computed(() => {
    return (this.config() as TextWidgetConfig).enableHighlights === true;
  });
}
