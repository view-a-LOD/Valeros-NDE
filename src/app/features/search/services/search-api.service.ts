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
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  search(query: SearchQuery): Observable<SearchResponse> {
    const params: HttpParams = buildHttpParams(query);

    const mockResponse: SearchResponse = {
      results: [
        {
          '@id': 'http://www.wikidata.org/entity/Q5582',
          '@type': ['http://schema.org/Person'],
          label: [
            {
              '@value': 'Vincent van Gogh',
              '@language': 'nl',
              highlight: '<mark>Vincent</mark> van Gogh',
              snippet: '<mark>Vincent</mark> van Gogh',
            },
          ],
          description: [
            {
              '@value':
                'Nederlandse postimpressionistische schilder Vincent van Gogh behoort tot de beroemdste en invloedrijkste figuren in de geschiedenis van de westerse kunst.',
              '@language': 'nl',
              highlight:
                'Nederlandse postimpressionistische schilder <mark>Vincent</mark> van Gogh behoort tot de beroemdste en invloedrijkste figuren in de geschiedenis van de westerse kunst.',
              snippet:
                '...postimpressionistische schilder <mark>Vincent</mark> van Gogh behoort tot de beroemdste...',
            },
          ],
          birthPlace: {
            '@id': 'http://www.wikidata.org/entity/Q9883',
            label: [
              {
                '@value': 'Zundert',
                '@language': 'nl',
              },
            ],
            description: [
              {
                '@value': 'Gemeente in Noord-Brabant, Nederland',
                '@language': 'nl',
              },
            ],
          },
          associatedMedia: [
            {
              '@id': 'https://example.org/v1/images/{id}',
              '@type': 'ImageObject',
              contentUrl:
                'https://collections.uu.nl/IIIF/33832/full/max/0/default.jpg',
              thumbnailUrl:
                'https://collections.uu.nl/IIIF/33832/full/!512,512/0/default.jpg',
            },
            {
              '@id':
                'https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json',
              '@type': 'MediaObject',
              encodingFormat:
                "application/ld+json;profile='http://iiif.io/api/presentation/2/context.json'",
            },
          ],
        },
      ],
      totalResults: 1,
      limit: 10,
      offset: 0,
    };

    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(mockResponse);
        subscriber.complete();
      }, 500);
    });

    // return this.http.get<SearchResponse>(`${this.apiUrl}/search`, { params });
  }
}
