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
          type: ['CreativeWork', 'Painting'],
          additionalType: [
            {
              id: 'https://example.org/v1/terms/{id}',
              type: 'DefinedTerm',
              name: 'fotoafdruk zwart-wit',
            },
          ],
          name: 'Fysisch laboratorium Utrecht 1896',
          creator: [
            {
              id: 'https://example.org/v1/persons/{id}',
              type: 'Person',
              name: 'John Doe',
            },
          ],
          associatedMedia: [
            {
              id: 'https://example.org/v1/media-objects/{id}',
              type: ['MediaObject', 'ImageObject'],
              license: {
                id: 'https://example.org/v1/licenses/{id}',
                name: 'Creative Commons: publieke domein',
              },
              contentUrl:
                'https://collections.uu.nl/IIIF/33832/full/max/0/default.jpg',
              thumbnailUrl:
                'https://collections.uu.nl/IIIF/33832/full/!512,512/0/default.jpg',
            },
            {
              id: 'https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json',
              type: 'MediaObject',
              encodingFormat:
                "application/ld+json;profile='http://iiif.io/api/presentation/2/context.json'",
            },
          ],
          description:
            'Zwart-wit foto van een kamer in het fysisch laboratorium te Utrecht, met rechts de amanuensis dhr. Marinus Pieter Filbri, in het midden de toen nog assistent Van Huffel en links de instrumentmaker G. Koolschijn, Utrecht, 1896.',
          dateCreated: '1896',
          genre: [
            {
              id: 'https://example.org/v1/terms/{id}',
              type: 'DefinedTerm',
              name: 'natuurwetenschappen',
            },
          ],
          material: [
            {
              id: 'https://example.org/v1/terms/{id}',
              type: 'DefinedTerm',
              name: 'papier',
            },
          ],
          locationCreated: [
            {
              id: 'https://example.org/v1/places/{id}',
              type: 'Place',
              name: 'Physisch Laboratorium',
            },
          ],
          contentLocation: [
            {
              id: 'https://example.org/v1/places/{id}',
              type: 'Place',
              name: 'Physisch Laboratorium',
            },
          ],
          temporalCoverage: '1896',
          size: '74 x 92 cm',
          text: 'Zwart-wit foto van een kamer in het fysisch laboratorium te Utrecht',
          publisher: {
            id: 'https://example.org/v1/organizations/{id}',
            type: 'Organization',
            name: 'Example Museum',
          },
          license: {
            id: 'https://example.org/v1/licenses/{id}',
            type: 'CreativeWork',
            name: 'Creative Commons: publieke domein',
          },
          sdDatePublished: '2026-04-08T13:35:03Z',
          isBasedOn: {
            id: 'https://n2t.net/ark:/40020/collect100',
            type: 'CreativeWork',
          },
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
