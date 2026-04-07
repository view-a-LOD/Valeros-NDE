import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { BaseWidget } from '../base-widget';
import { PropertyLabelWrapperComponent } from '../../property-label-wrapper/property-label-wrapper.component';

@Component({
  selector: 'app-json-widget',
  standalone: true,
  imports: [JsonPipe, PropertyLabelWrapperComponent],
  templateUrl: './json-widget.component.html',
})
export class JsonWidget extends BaseWidget {}
