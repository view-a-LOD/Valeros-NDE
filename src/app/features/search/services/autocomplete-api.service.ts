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
  autocomplete(query: AutocompleteQuery): Observable<AutocompleteResponse> {
    // TODO: Connect with API
    const mockResponse: AutocompleteResponse = {
      results: [
        {
          id: 'http://www.wikidata.org/entity/Q5582',
          name: 'Vincent van Gogh',
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
  }
}
