import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AutocompleteQuery,
  AutocompleteResponse,
} from '@valeros-ldkit/shared-types';
import { buildHttpParams } from '../../../shared/utils/http-params.util';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  autocomplete(query: AutocompleteQuery): Observable<AutocompleteResponse> {
    const params: HttpParams = buildHttpParams(query);
    return this.http.get<AutocompleteResponse>(`${this.apiUrl}/autocomplete`, {
      params,
    });
  }
}
