import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteNode } from '../../../../../types/autocomplete-node';

@Component({
  selector: 'app-autocomplete-result-item',
  imports: [CommonModule],
  templateUrl: './autocomplete-result-item.component.html',
  standalone: true,
})
export class AutocompleteResultItemComponent {
  item = input.required<AutocompleteNode>();
  itemClick = output<void>();
}
