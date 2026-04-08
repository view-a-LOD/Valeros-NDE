import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { buildHttpParams } from '../../../shared/utils/http-params.util';
import { AutocompleteQuery } from '../../../types/autocomplete-query';
import { AutocompleteResponse } from '../../../types/autocomplete-response';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteApiService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  autocomplete(query: AutocompleteQuery): Observable<AutocompleteResponse> {
    const params: HttpParams = buildHttpParams(query);

    const mockResponse: AutocompleteResponse = {
      results: [
        {
          $id: 'http://www.wikidata.org/entity/Q5582',
          label: 'Vincent van Gogh',
        },
      ],
      suggestions: ['Vincent van Gogh', 'Vermeer'],
    };

    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 300);
    });

    // return this.http.get<AutocompleteResponse>(`${this.apiUrl}/autocomplete`, {
    //   params,
    // });
  }
}
