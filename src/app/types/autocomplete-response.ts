import { AutocompleteNode } from './autocomplete-node';

export interface AutocompleteResponse {
  results: AutocompleteNode[];
  suggestions: string[];
}
