import { Component, input, computed } from '@angular/core';
import { WidgetConfig } from '../../types/widget-config';

@Component({
  selector: 'app-property-label-wrapper',

  templateUrl: './property-label-wrapper.component.html',
})
export class PropertyLabelWrapperComponent {
  property = input.required<string>();
  config = input<WidgetConfig>({});

  showLabel = computed(() => this.config().showPropertyLabel !== false);
  displayLabel = computed(() => this.config().propertyLabel || this.property());
}
