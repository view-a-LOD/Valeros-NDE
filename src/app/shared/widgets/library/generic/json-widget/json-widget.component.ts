import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { BaseWidget } from '../../../infrastructure/base-widget';

@Component({
  selector: 'app-json-widget',

  imports: [JsonPipe],
  templateUrl: './json-widget.component.html',
})
export class JsonWidget extends BaseWidget {}
