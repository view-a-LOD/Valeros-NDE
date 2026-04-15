import { NodeModel } from '../../../shared/types/node/node.model';
import { normalizeToString } from '../../../shared/utils/value-normalization.util';
import { AutocompleteNode } from '../types/autocomplete-node';
import { AutocompleteResponse } from '../types/autocomplete-response';
import { SearchResponse } from '../types/search-response';

export function transformToAutocompleteResponse(
  response: SearchResponse,
): AutocompleteResponse {
  const results: AutocompleteNode[] = response.orderedItems.map(
    (item: NodeModel) => ({
      id: item.id,
      name: normalizeToString(item.name),
    }),
  );

  // TODO: Replace with actual suggestions from API
  const suggestions: string[] = response.orderedItems
    .map((item: NodeModel) => normalizeToString(item.name))
    .filter((name): name is string => !!name);

  return {
    results,
    suggestions,
  };
}
