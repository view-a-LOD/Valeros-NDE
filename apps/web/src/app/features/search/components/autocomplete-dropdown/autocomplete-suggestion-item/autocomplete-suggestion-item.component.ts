import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autocomplete-suggestion-item',
  imports: [CommonModule],
  templateUrl: './autocomplete-suggestion-item.component.html',
  standalone: true,
})
export class AutocompleteSuggestionItemComponent {
  suggestion = input.required<string>();
  suggestionClick = output<void>();
}
