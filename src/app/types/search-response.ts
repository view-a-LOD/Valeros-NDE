import { SearchNode } from './search-node';
import { FacetValue } from './facet-value';

export interface SearchResponse {
  results: SearchNode[];
  totalResults: number;
  limit: number;
  offset: number;
  facets?: Record<string, FacetValue[]>;
}
