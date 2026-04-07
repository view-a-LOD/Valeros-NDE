import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchQuery, SearchResponse } from '@valeros-ldkit/shared-types';
import { buildHttpParams } from '../../../shared/utils/http-params.util';

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  search(query: SearchQuery): Observable<SearchResponse> {
    const params: HttpParams = buildHttpParams(query);
    return this.http.get<SearchResponse>(`${this.apiUrl}/search`, { params });
  }
}
