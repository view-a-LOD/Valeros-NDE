import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchQuery, SearchResponse } from '@valeros-ldkit/shared-types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  search(query: SearchQuery): Observable<SearchResponse> {
    const params: HttpParams = this.buildQueryParams(query);
    return this.http.get<SearchResponse>(`${this.apiUrl}/search`, { params });
  }

  private buildQueryParams(query: SearchQuery): HttpParams {
    let params = new HttpParams();

    const addParam = (key: string, value?: string | number | boolean) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    };

    const addArrayParam = (key: string, values?: string[]) => {
      if (values?.length) {
        values.forEach((value) => {
          params = params.append(key, value);
        });
      }
    };

    addParam('query', query.query);
    addArrayParam('properties', query.properties);
    addArrayParam('searchProperties', query.searchProperties);
    addParam('filters', query.filters);
    addArrayParam('facets', query.facets);
    addParam('sortBy', query.sortBy);
    addParam('sortOrder', query.sortOrder);
    addParam('limit', query.limit);
    addParam('offset', query.offset);
    addArrayParam('languages', query.languages);
    addParam('highlightMatches', query.highlightMatches);
    addParam('returnHighlightedSnippets', query.returnHighlightedSnippets);
    addParam('snippetLength', query.snippetLength);

    return params;
  }
}
