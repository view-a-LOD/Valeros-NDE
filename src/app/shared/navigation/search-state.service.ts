import { Injectable, signal } from '@angular/core';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {
  private searchParams = signal<Params>({});

  setSearchParams(params: Params): void {
    this.searchParams.set(params);
  }

  getSearchParams(): Params {
    return this.searchParams();
  }

  clear(): void {
    this.searchParams.set({});
  }
}
