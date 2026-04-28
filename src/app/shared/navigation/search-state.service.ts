import { Injectable, signal } from '@angular/core';
import { Params } from '@angular/router';

const saveToSessionStorage = (params: Params): void => {
  if (Object.keys(params).length > 0) {
    sessionStorage.setItem('lastSearchParams', JSON.stringify(params));
  }
};

const loadFromSessionStorage = (): Params | null => {
  const stored = sessionStorage.getItem('lastSearchParams');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('[SearchStateService] Failed to parse sessionStorage:', e);
    return null;
  }
};

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {
  private searchParams = signal<Params>({});

  setSearchParams(params: Params): void {
    this.searchParams.set(params);
    saveToSessionStorage(params);
  }

  getSearchParams(): Params {
    let params = this.searchParams();

    if (Object.keys(params).length === 0) {
      const paramsFromSessionStorage = loadFromSessionStorage();
      if (paramsFromSessionStorage) {
        params = paramsFromSessionStorage;
        this.searchParams.set(params);
      }
    }

    return params;
  }

  clear(): void {
    this.searchParams.set({});
  }
}
