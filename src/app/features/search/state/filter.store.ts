import { Injectable, signal } from '@angular/core';

type Filters = Record<string, Set<string>>;

@Injectable({
  providedIn: 'root',
})
export class FilterStore {
  selectedFilters = signal<Filters>({});

  toggleFilter(facetName: string, value: string): void {
    const currentFilters: Filters = { ...this.selectedFilters() };

    if (!currentFilters[facetName]) {
      currentFilters[facetName] = new Set<string>();
    }

    if (currentFilters[facetName].has(value)) {
      currentFilters[facetName].delete(value);
      if (currentFilters[facetName].size === 0) {
        delete currentFilters[facetName];
      }
    } else {
      currentFilters[facetName].add(value);
    }

    this.selectedFilters.set(currentFilters);
  }

  isFilterSelected(facetName: string, value: string): boolean {
    return this.selectedFilters()[facetName]?.has(value) ?? false;
  }

  clearFilters(): void {
    this.selectedFilters.set({});
  }

  buildFilterStrings(): string[] {
    const filterStrings: string[] = [];
    const selectedFilters = this.selectedFilters();

    for (const [facetName, values] of Object.entries(selectedFilters)) {
      for (const value of values) {
        const decodedValue = decodeURIComponent(value);
        filterStrings.push(`${facetName}:${decodedValue}`);
      }
    }

    return filterStrings;
  }

  hasActiveFilters(): boolean {
    return Object.keys(this.selectedFilters()).length > 0;
  }
}
