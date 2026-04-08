import { Component } from '@angular/core';
import { BaseWidget } from '../base-widget';

@Component({
  selector: 'app-image-widget',
  standalone: true,
  imports: [],
  templateUrl: './image-widget.component.html',
})
export class ImageWidget extends BaseWidget {}
