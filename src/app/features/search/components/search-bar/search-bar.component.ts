import { Component, inject, viewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchStore } from '../../state/search.store';
import { AutocompleteDropdownComponent } from '../autocomplete-dropdown/autocomplete-dropdown.component';
import { AutocompleteNode } from '../../types/autocomplete-node';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSearch } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule, AutocompleteDropdownComponent, NgIcon],
  templateUrl: './search-bar.component.html',
  viewProviders: [provideIcons({ featherSearch })],
})
export class SearchBarComponent {
  store = inject(SearchStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  autocomplete = viewChild<AutocompleteDropdownComponent>('autocomplete');

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private skipFirstDebouncedSearch = true;

  constructor() {
    effect(() => {
      const searchTerm = this.store.searchTerm();

      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = setTimeout(() => {
        if (this.skipFirstDebouncedSearch) {
          this.skipFirstDebouncedSearch = false;
          return;
        }
        this.performSearch(searchTerm);
      }, 300);
    });
  }

  onSearchTermChange(value: string): void {
    this.store.searchTerm.set(value);
  }

  private performSearch(searchTerm: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: searchTerm || undefined, filters: undefined },
      queryParamsHandling: 'merge',
    });
  }

  onSearch(): void {
    this.autocomplete()?.hideAndSuppress();
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    const searchTerm = this.store.searchTerm();
    this.performSearch(searchTerm);
  }

  onAutocompleteSelect(item: AutocompleteNode): void {
    const id = item.id;
    if (id) {
      this.autocomplete()?.hideAndSuppress();
      this.router.navigate(['/details'], { queryParams: { id } });
    }
  }

  onSuggestionSelect(suggestion: string): void {
    this.store.searchTerm.set(suggestion);
    this.autocomplete()?.hideAndSuppress();
    this.performSearch(suggestion);
  }

  onInputFocus(): void {
    this.autocomplete()?.showCachedResults();
  }

  onInputBlur(): void {
    this.autocomplete()?.hide();
  }
}
