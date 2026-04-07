import { Component } from '@angular/core';
import { BaseWidget } from '../base-widget';
import { PropertyLabelWrapperComponent } from '../../property-label-wrapper/property-label-wrapper.component';

@Component({
  selector: 'app-image-widget',
  standalone: true,
  imports: [PropertyLabelWrapperComponent],
  templateUrl: './image-widget.component.html',
})
export class ImageWidget extends BaseWidget {}
