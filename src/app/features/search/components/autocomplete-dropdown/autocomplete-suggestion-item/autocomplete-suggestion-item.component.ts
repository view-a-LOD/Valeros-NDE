import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autocomplete-suggestion-item',
  imports: [CommonModule],
  templateUrl: './autocomplete-suggestion-item.component.html',
})
export class AutocompleteSuggestionItemComponent {
  suggestion = input.required<string>();
  suggestionClick = output<void>();
}
