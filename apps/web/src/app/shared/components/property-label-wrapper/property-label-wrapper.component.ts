import { Component, input } from '@angular/core';

@Component({
  selector: 'app-property-label-wrapper',
  standalone: true,
  templateUrl: './property-label-wrapper.component.html',
})
export class PropertyLabelWrapperComponent {
  property = input.required<string>();
}
