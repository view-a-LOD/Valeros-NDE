import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchStore } from '../../state/search.store';
import { AutocompleteDropdownComponent } from '../autocomplete-dropdown/autocomplete-dropdown.component';
import { AutocompleteNode } from '../../types/autocomplete-node';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule, AutocompleteDropdownComponent],
  templateUrl: './search-bar.component.html',
  standalone: true,
})
export class SearchBarComponent {
  store = inject(SearchStore);
  private router = inject(Router);

  @ViewChild('autocomplete') autocomplete?: AutocompleteDropdownComponent;

  onSearchTermChange(value: string): void {
    this.store.searchTerm.set(value);
  }

  onSearch(): void {
    this.autocomplete?.hideAndSuppress();
    const searchTerm = this.store.searchTerm();
    this.router.navigate([], {
      queryParams: { q: searchTerm || undefined, filters: undefined },
    });
  }

  onAutocompleteSelect(item: AutocompleteNode): void {
    const id = item.id;
    if (id) {
      this.autocomplete?.hideAndSuppress();
      this.router.navigate(['/details'], { queryParams: { id } });
    }
  }

  onSuggestionSelect(suggestion: string): void {
    this.store.searchTerm.set(suggestion);
    this.autocomplete?.hideAndSuppress();
    this.router.navigate([], {
      queryParams: { q: suggestion || undefined, filters: undefined },
    });
  }

  onInputFocus(): void {
    this.autocomplete?.showCachedResults();
  }

  onInputBlur(): void {
    this.autocomplete?.hide();
  }
}
