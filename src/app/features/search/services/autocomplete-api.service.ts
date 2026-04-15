import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { buildHttpParams } from '../../../shared/utils/http-params.util';
import { AutocompleteQuery } from '../types/autocomplete-query';
import { AutocompleteResponse } from '../types/autocomplete-response';
import { SearchResponse } from '../types/search-response';
import { transformToAutocompleteResponse } from '../utils/search-response.util';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:3000/v1';

  autocomplete(query: AutocompleteQuery): Observable<AutocompleteResponse> {
    // TODO: Replace hardcoded size and page
    const params = buildHttpParams({ q: query.query, size: 5 });
    const url = `${this.apiBaseUrl}/heritage-objects/page/1`;

    return this.http
      .get<SearchResponse>(url, { params })
      .pipe(map(transformToAutocompleteResponse));
  }
}
