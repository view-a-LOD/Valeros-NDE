import { Component } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { HighlightedTextComponent } from '../../highlighted-text/highlighted-text.component';
import { PropertyLabelWrapperComponent } from '../../property-label-wrapper/property-label-wrapper.component';

@Component({
  selector: 'app-text-widget',
  standalone: true,
  imports: [HighlightedTextComponent, PropertyLabelWrapperComponent],
  templateUrl: './text-widget.component.html',
})
export class TextWidget extends BaseWidget {}
