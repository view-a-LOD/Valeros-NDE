import { NodeModel } from '../../../shared/types/node/node.model';
import { normalizeToFirst } from '../../../shared/utils/value-normalization.util';
import { AutocompleteNode } from '../types/autocomplete-node';
import { AutocompleteResponse } from '../types/autocomplete-response';
import { SearchResponse } from '../types/search-response';
import { AssociatedMediaObject } from '../../../shared/types/node/associated-media-object';
import { toImageModel } from '../../../shared/utils/image-model.util';

export function transformToAutocompleteResponse(
  response: SearchResponse,
): AutocompleteResponse {
  const results: AutocompleteNode[] = response.orderedItems.map(
    (item: NodeModel) => {
      const node: AutocompleteNode = {
        id: item.id,
        name: normalizeToFirst<string>(item.name),
      };

      const firstMedia: AssociatedMediaObject | undefined =
        normalizeToFirst<AssociatedMediaObject>(item['associatedMedia']);
      if (firstMedia) {
        node.image = toImageModel(firstMedia);
      }

      return node;
    },
  );

  // TODO: Replace with "Terms" endpoint call once available
  const suggestions: string[] = response.orderedItems
    .map((item: NodeModel) => normalizeToFirst<string>(item.name))
    .filter((name): name is string => !!name);

  return {
    results,
    suggestions,
  };
}
