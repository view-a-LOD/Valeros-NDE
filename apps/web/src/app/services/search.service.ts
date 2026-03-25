import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NodeType, SearchQuery } from '@valeros-ldkit/shared-types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  search(query: SearchQuery): Observable<NodeType[]> {
    let params = new HttpParams();

    if (query.endpoints && query.endpoints.length > 0) {
      query.endpoints.forEach((endpoint) => {
        params = params.append('endpoints', endpoint);
      });
    }

    if (query.filters) {
      params = params.set('filters', query.filters);
    }

    return this.http.get<NodeType[]>(`${this.apiUrl}/search`, { params });
  }
}
