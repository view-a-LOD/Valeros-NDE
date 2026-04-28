import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Filters, SerializableFilters } from '../types/filters';
import { FacetValue } from '../types/facet';

@Injectable({
  providedIn: 'root',
})
export class FilterStore {
  private router = inject(Router);

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

    this.updateUrlWithFilters(currentFilters);
  }

  private updateUrlWithFilters(filters: Filters): void {
    const filterParam = this.serialize(filters);

    this.router.navigate([], {
      queryParams: { filters: filterParam || undefined },
      queryParamsHandling: 'merge',
    });
  }

  isFilterSelected(facetName: string, value: string): boolean {
    return this.selectedFilters()[facetName]?.has(value) ?? false;
  }

  clearFilters(): void {
    this.router.navigate([], {
      queryParams: { filters: undefined },
      queryParamsHandling: 'merge',
    });
  }

  buildFilterStrings(): string[] {
    const filterStrings: string[] = [];
    const selectedFilters = this.selectedFilters();

    for (const [facetName, values] of Object.entries(selectedFilters)) {
      for (const value of values) {
        const decodedValue = decodeURIComponent(value);
        const escapedValue = decodedValue.replace(/`/g, '\\`');
        filterStrings.push(`${facetName}:\`${escapedValue}\``);
      }
    }

    return filterStrings;
  }

  hasActiveFilters(): boolean {
    return Object.keys(this.selectedFilters()).length > 0;
  }

  serialize(filters: Filters): string | null {
    if (Object.keys(filters).length === 0) {
      return null;
    }

    const serializableFilters: SerializableFilters = {};
    for (const [facetName, values] of Object.entries(filters)) {
      serializableFilters[facetName] = Array.from(values).sort();
    }

    return JSON.stringify(serializableFilters);
  }

  deserialize(filterParam: string | null): Filters {
    if (!filterParam) {
      return {};
    }
    try {
      const parsed: SerializableFilters = JSON.parse(filterParam);
      const filters: Filters = {};
      for (const [facetName, values] of Object.entries(parsed)) {
        filters[facetName] = new Set(values);
      }
      return filters;
    } catch {
      return {};
    }
  }

  clearFiltersIfQueryChanged(
    newQuery: string,
    previousQuery: string | null,
  ): void {
    const queryChanged = previousQuery !== null && previousQuery !== newQuery;

    if (queryChanged) {
      this.selectedFilters.set({});
    }
  }

  syncFiltersFromUrl(urlFilters: string | null): void {
    const currentFilters: Filters = this.selectedFilters();
    const serializedFilters: string | null = this.serialize(currentFilters);
    const filtersChanged: boolean = serializedFilters !== urlFilters;

    if (filtersChanged) {
      const deserializedFilters: Filters = this.deserialize(urlFilters);
      this.selectedFilters.set(deserializedFilters);
    }
  }
}
