import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildHttpParams } from '../../../shared/utils/http-params.util';
import { SearchQuery } from '../../../types/search-query';
import { SearchResponse } from '../../../types/search-response';

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  search(query: SearchQuery): Observable<SearchResponse> {
    // TODO: Connect with API

    const mockResponse: SearchResponse = {
      id: 'https://example.org/v1/heritage-objects/page/1?size=10&q=*',
      type: 'OrderedCollectionPage',
      partOf: {
        id: 'https://example.org/v1/heritage-objects',
        type: 'OrderedCollection',
        totalItems: 1,
        first: 'https://example.org/v1/heritage-objects/page/1?size=10&q=*',
        last: 'https://example.org/v1/heritage-objects/page/1?size=10&q=*',
      },
      startIndex: 0,
      orderedItems: [
        {
          id: 'https://example.org/v1/heritage-objects/{id}',
          type: 'CreativeWork',
          name: 'Fysisch laboratorium Utrecht 1896',
          description:
            'Zwart-wit foto van een kamer in het fysisch laboratorium te Utrecht, met rechts de amanuensis dhr. Marinus Pieter Filbri, in het midden de toen nog assistent Van Huffel en links de instrumentmaker G. Koolschijn, Utrecht, 1896.',
          associatedMedia: [
            {
              id: 'https://example.org/v1/images/{id}',
              type: 'ImageObject',
              contentUrl:
                'https://collections.uu.nl/IIIF/33832/full/max/0/default.jpg',
              thumbnailUrl:
                'https://collections.uu.nl/IIIF/33832/full/!512,512/0/default.jpg',
            },
          ],
        },
      ],
    };

    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 500);
    });
  }
}
