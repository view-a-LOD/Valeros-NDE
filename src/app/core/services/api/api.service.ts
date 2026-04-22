import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { buildHttpParams } from '../../utils/http-params.util';
import { SearchQuery } from '../../../features/search/types/search-query';
import {
  SearchResponse,
  transformToAutocompleteResponse,
} from '../../../features/search/types/search-response';
import { AutocompleteQuery } from '../../../features/search/types/autocomplete-query';
import { AutocompleteResponse } from '../../../features/search/types/autocomplete-response';
import { NodeModel } from '../../models/node/node.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly mockDataService = inject(MockDataService);
  private readonly apiBaseUrl = 'http://localhost:3000/v1';

  search(query: SearchQuery): Observable<SearchResponse> {
    const { page, ...queryParams } = query;
    const params = buildHttpParams(queryParams);
    const url = `${this.apiBaseUrl}/heritage-objects/page/${page}`;

    return this.http.get<SearchResponse>(url, { params });
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
    if (id.includes('v1/places/')) {
      return this.mockDataService.placeDetails(id);
    }
    // if (id.includes('v1/heritage-objects/')) {
    //   return this.mockDataService.heritageObjectDetails(id);
    // }
    if (id.includes('v1/organizations/')) {
      return this.mockDataService.organizationDetails(id);
    }
    if (id.includes('v1/persons/')) {
      return this.mockDataService.personDetails(id);
    }
    if (id.includes('v1/occupations/')) {
      return this.mockDataService.occupationDetails(id);
    }
    if (id.includes('v1/media-objects/')) {
      return this.mockDataService.mediaObjectDetails(id);
    }
    if (id.includes('v1/licenses/')) {
      return this.mockDataService.licenseDetails(id);
    }
    if (id.includes('v1/terms/')) {
      return this.mockDataService.termDetails(id);
    }
    if (id.includes('v1/datasets/')) {
      return this.mockDataService.datasetDetails(id);
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
        return response.orderedItems[0];
      }),
    );
  }
}
