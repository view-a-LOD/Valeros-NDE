import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteNode } from '@valeros-ldkit/shared-types';
import { SearchStore } from '../../state/search.store';
import { AutocompleteDropdownComponent } from '../autocomplete-dropdown/autocomplete-dropdown.component';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule, AutocompleteDropdownComponent],
  templateUrl: './search-bar.component.html',
  standalone: true,
})
export class SearchBarComponent {
  store = inject(SearchStore);

  @ViewChild('autocomplete') autocomplete?: AutocompleteDropdownComponent;

  onSearchTermChange(value: string): void {
    this.store.setSearchTerm(value);
  }

  onSearch(): void {
    this.autocomplete?.hideAndSuppress();
    this.store.search();
  }

  onAutocompleteSelect(item: AutocompleteNode): void {
    alert('TODO: To implement');
  }

  onSuggestionSelect(suggestion: string): void {
    this.store.setSearchTerm(suggestion);
    this.autocomplete?.hideAndSuppress();
    this.store.search();
  }

  onInputFocus(): void {
    this.autocomplete?.showCachedResults();
  }

  onInputBlur(): void {
    this.autocomplete?.hide();
  }
}
