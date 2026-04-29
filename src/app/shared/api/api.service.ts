import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { buildHttpParams } from './http-params.util';
import { MockDataService } from './mock-data.service';
import { AutocompleteQuery } from '../../features/search/types/autocomplete-query';
import { AutocompleteResponse } from '../../features/search/types/autocomplete-response';
import { SearchQuery } from '../../features/search/types/search-query';
import {
  SearchResponse,
  transformToAutocompleteResponse,
} from '../../features/search/types/search-response';
import { NodeModel } from '../node/types/node.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly mockDataService = inject(MockDataService);
  readonly apiBaseUrl = 'http://localhost:3000/v1';

  search(query: SearchQuery): Observable<SearchResponse> {
    const { page, ...queryParams } = query;
    const params = buildHttpParams(queryParams);
    const url = `${this.apiBaseUrl}/heritage-objects/page/${page}`;

    // TODO: Remove mock geo when API is ready
    return this.http
      .get<SearchResponse>(url, { params })
      .pipe(
        map((response: SearchResponse) =>
          this.mockDataService.addRandomGeoToSearchResponse(response),
        ),
      );
  }

  autocomplete(query: AutocompleteQuery): Observable<AutocompleteResponse> {
    // TODO: Replace hardcoded size and page
    const params = buildHttpParams({ q: query.query, size: 5 });
    const url = `${this.apiBaseUrl}/heritage-objects/page/1`;

    return this.http
      .get<SearchResponse>(url, { params })
      .pipe(map(transformToAutocompleteResponse));
  }

  details(id: string): Observable<NodeModel> {
    let mockObservable: Observable<NodeModel> | null = null;

    if (id.includes('v1/places/')) {
      mockObservable = this.mockDataService.placeDetails(id);
    }
    // if (id.includes('v1/heritage-objects/')) {
    //   mockObservable = this.mockDataService.heritageObjectDetails(id);
    // }
    else if (id.includes('v1/organizations/')) {
      mockObservable = this.mockDataService.organizationDetails(id);
    } else if (id.includes('v1/persons/')) {
      mockObservable = this.mockDataService.personDetails(id);
    } else if (id.includes('v1/occupations/')) {
      mockObservable = this.mockDataService.occupationDetails(id);
    } else if (id.includes('v1/media-objects/')) {
      mockObservable = this.mockDataService.mediaObjectDetails(id);
    } else if (id.includes('v1/licenses/')) {
      mockObservable = this.mockDataService.licenseDetails(id);
    } else if (id.includes('v1/terms/')) {
      mockObservable = this.mockDataService.termDetails(id);
    } else if (id.includes('v1/datasets/')) {
      mockObservable = this.mockDataService.datasetDetails(id);
    }

    if (mockObservable) {
      // TODO: Remove mock geo when API is ready
      return mockObservable.pipe(
        map((node) => this.mockDataService.addRandomGeoToNode(node)),
      );
    }

    // TODO: Use proper endpoint when available (GET /v1/heritage-objects/{id})
    // For now, use search with ID filter
    const params = buildHttpParams({
      filter: `id:${id}`,
      size: 1,
    });
    const url = `${this.apiBaseUrl}/heritage-objects/page/1`;

    return this.http.get<SearchResponse>(url, { params }).pipe(
      map((response) => {
        if (response.orderedItems.length === 0) {
          throw new Error('No item found with this ID');
        }
        const firstItem = response.orderedItems[0];

        // TODO: Remove mock geo when API is ready
        const firstItemWithMockGeo =
          this.mockDataService.addRandomGeoToNode(firstItem);
        return firstItemWithMockGeo;
      }),
    );
  }
}
