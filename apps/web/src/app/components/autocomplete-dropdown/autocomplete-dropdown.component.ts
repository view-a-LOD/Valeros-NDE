import {
  Component,
  inject,
  input,
  output,
  signal,
  effect,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AutocompleteNode,
  AutocompleteResponse,
} from '@valeros-ldkit/shared-types';
import { AutocompleteService } from '../../services/autocomplete.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-dropdown',
  imports: [CommonModule],
  templateUrl: './autocomplete-dropdown.component.html',
  standalone: true,
})
export class AutocompleteDropdownComponent {
  searchTerm = input<string>('');
  minChars = input<number>(2);
  debounceMs = input<number>(300);

  selectItem = output<AutocompleteNode>();
  selectSuggestion = output<string>();

  results = signal<AutocompleteNode[]>([]);
  suggestions = signal<string[]>([]);
  loading = signal<boolean>(false);
  show = signal<boolean>(false);

  hasResults = computed(
    () => this.results().length > 0 || this.suggestions().length > 0,
  );

  private autocompleteService = inject(AutocompleteService);
  private autocompleteSubject = new Subject<string>();

  constructor() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    this.autocompleteSubject
      .pipe(
        debounceTime(this.debounceMs()),
        distinctUntilChanged(),
        switchMap((term) => {
          if (!this.isTermValid(term)) {
            this.show.set(false);
            return [];
          }
          this.loading.set(true);
          return this.autocompleteService.autocomplete({ query: term });
        }),
      )
      .subscribe({
        next: (response: AutocompleteResponse) => {
          this.results.set(response.results);
          this.suggestions.set(response.suggestions);
          this.show.set(true);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.show.set(false);
        },
      });

    this.watchSearchTermChanges();
  }

  watchSearchTermChanges() {
    effect(() => {
      const term = this.searchTerm();
      this.autocompleteSubject.next(term);
    });
  }

  hide(): void {
    this.show.set(false);
  }

  showCachedResults(): void {
    if (this.isTermValid(this.searchTerm()) && this.hasResults()) {
      this.show.set(true);
    }
  }

  private isTermValid(term: string): boolean {
    return !!term && term.length >= this.minChars();
  }
}
