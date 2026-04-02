import { NodeObject } from 'jsonld';
import { SearchValueObject } from './search-value-object';

export type JsonLdPropertyValue = NodeObject[keyof NodeObject];

export interface SearchNode extends NodeObject {
  '@id'?: string;
  '@type'?: string[];
  label?: SearchValueObject[];
  description?: SearchValueObject[];
  [key: string]: JsonLdPropertyValue;
}
