import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NodeModel } from '../node/types/node.model';
import { SearchResponse } from '../../features/search/types/search-response';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  // TODO: Use proper endpoint when available (GET /v1/places/{id})
  placeDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/places/{id}',
      type: 'Place',
      name: 'Physisch Laboratorium',
      address: {
        type: 'PostalAddress',
        streetAddress: 'Bijlhouwerstraat 6',
        postalCode: '3511 ZC',
        addressLocality: 'Utrecht',
        addressRegion: 'Utrecht',
        addressCountry: 'NL',
      },
      geo: {
        type: 'GeoCoordinates',
        latitude: 52.0815523,
        longitude: 5.1203423,
      },
    });
  }

  // TODO: Use proper endpoint when available (GET /v1/organizations/{id})
  organizationDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/organizations/{id}',
      type: 'Organization',
      name: 'Example Museum',
      location: {
        id: 'https://example.org/v1/places/{id}',
        type: 'Place',
        name: 'Office location',
      },
    });
  }

  // TODO: Use proper endpoint when available (GET /v1/persons/{id})
  personDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/persons/{id}',
      type: 'Person',
      name: 'John Doe',
      birthPlace: {
        id: 'https://example.org/v1/places/{id}',
        type: 'Place',
        name: 'Utrecht',
      },
      birthDate: '1871-01-01',
      deathPlace: {
        id: 'https://example.org/v1/places/{id}',
        type: 'Place',
        name: 'Amsterdam',
      },
      deathDate: '1941-12-31',
      hasOccupation: [
        {
          id: 'https://example.org/v1/occupations/{id}',
          type: 'Occupation',
          name: 'Carpenter',
        },
      ],
    });
  }

  // TODO: Use proper endpoint when available (GET /v1/occupations/{id})
  occupationDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/occupations/{id}',
      type: 'Occupation',
      name: 'Carpenter',
    });
  }

  // TODO: Use proper endpoint when available (GET /v1/media-objects/{id})
  mediaObjectDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/media-objects/{id}',
      type: ['MediaObject', 'ImageObject'],
      license: {
        id: 'https://example.org/v1/licenses/{id}',
        type: 'CreativeWork',
        name: 'Creative Commons: publieke domein',
      },
      copyrightNotice:
        '© 2025 Example Museum, with permission from Ph. Otographer',
      contentUrl: 'https://collections.uu.nl/IIIF/33832/full/max/0/default.jpg',
      thumbnailUrl:
        'https://collections.uu.nl/IIIF/33832/full/!512,512/0/default.jpg',
      isBasedOn: {
        id: 'https://collections.uu.nl/IIIF/33832',
        encodingFormat:
          "application/ld+json;profile='http://iiif.io/api/image/3/context.json'",
      },
    });
  }

  // TODO: Use proper endpoint when available (GET /v1/licenses/{id})
  licenseDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/licenses/{id}',
      type: 'CreativeWork',
      name: 'Creative Commons: publieke domein',
      isBasedOn: {
        id: 'https://creativecommons.org/public-domain/cc0/',
        type: 'CreativeWork',
      },
    });
  }

  // TODO: Use proper endpoint when available (GET /v1/terms/{id})
  termDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/terms/{id}',
      type: 'DefinedTerm',
      name: 'fotoafdruk zwart-wit',
    });
  }

  // TODO: Use proper endpoint when available (GET /v1/datasets/{id})
  datasetDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/datasets/{id}',
      type: 'Dataset',
      name: 'Example Dataset',
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
    });
  }

  addRandomGeoToPlaceObjects(
    value: any | any[] | undefined,
  ): any | any[] | undefined {
    if (value === undefined || value === null) return undefined;

    const processObject = (obj: any) => {
      if (obj?.type === 'Place') {
        return {
          ...obj,
          geo: {
            type: 'GeoCoordinates',
            latitude: 50 + Math.random() * 3.5,
            longitude: 3 + Math.random() * 4,
          },
        };
      }
      return obj;
    };

    if (Array.isArray(value)) {
      return value.map(processObject);
    }

    return processObject(value);
  }

  addRandomGeoToNode(node: NodeModel): NodeModel {
    const enrichedNode: NodeModel = { ...node };

    for (const [property, value] of Object.entries(node)) {
      const processed = this.addRandomGeoToPlaceObjects(value);
      if (processed !== undefined) {
        enrichedNode[property] = processed;
      }
    }

    return enrichedNode;
  }

  addRandomGeoToSearchResponse(response: SearchResponse): SearchResponse {
    return {
      ...response,
      orderedItems: response.orderedItems.map((node: NodeModel) =>
        this.addRandomGeoToNode(node),
      ),
    };
  }
}
