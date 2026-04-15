import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildHttpParams } from '../../../shared/utils/http-params.util';
import { SearchQuery } from '../types/search-query';
import { SearchResponse } from '../types/search-response';

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = 'http://localhost:3000/v1';

  search(query: SearchQuery): Observable<SearchResponse> {
    const { page, ...queryParams } = query;
    const params = buildHttpParams(queryParams);
    const url = `${this.apiBaseUrl}/heritage-objects/page/${page}`;

    return this.http.get<SearchResponse>(url, { params });
  }
}
