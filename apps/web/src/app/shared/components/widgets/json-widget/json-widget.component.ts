import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { BaseWidget } from '../base-widget';

@Component({
  selector: 'app-json-widget',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './json-widget.component.html',
})
export class JsonWidget extends BaseWidget {}
