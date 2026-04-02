import { SearchValueObject } from './search-value-object';

export interface FacetValue {
  '@id': string;
  label?: SearchValueObject[];
  count: number;
  facets?: Record<string, FacetValue[]>;
}
