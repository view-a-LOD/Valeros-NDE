import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../base-widget';

@Component({
  selector: 'app-badge-widget',

  imports: [CommonModule],
  templateUrl: './badge-widget.component.html',
})
export class BadgeWidget extends BaseWidget {}
