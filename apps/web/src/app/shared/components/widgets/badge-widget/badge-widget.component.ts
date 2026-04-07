import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWidget } from '../base-widget';
import { PropertyLabelWrapperComponent } from '../../property-label-wrapper/property-label-wrapper.component';

@Component({
  selector: 'app-badge-widget',
  standalone: true,
  imports: [CommonModule, PropertyLabelWrapperComponent],
  templateUrl: './badge-widget.component.html',
})
export class BadgeWidget extends BaseWidget {}
