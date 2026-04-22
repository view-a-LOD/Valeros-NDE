import {
  AssociatedMediaNode,
  toImageModel,
} from '../../../core/models/node/associated-media.node';
import { NodeModel } from '../../../core/models/node/node.model';
import { normalizeToFirst } from '../../../shared/utils/value-normalization.util';
import { AutocompleteNode } from './autocomplete-node';
import { AutocompleteResponse } from './autocomplete-response';
import { Facet } from './facet';

export interface SearchResponse {
  id: string;
  type: 'OrderedCollectionPage';
  partOf: {
    id: string;
    type: 'OrderedCollection';
    totalItems: number;
    first?: string;
    last?: string;
    facets?: Facet[];
  };
  next?: string;
  prev?: string;
  startIndex: number;
  orderedItems: NodeModel[];
}

export function transformToAutocompleteResponse(
  response: SearchResponse,
): AutocompleteResponse {
  const results: AutocompleteNode[] = response.orderedItems.map(
    (item: NodeModel) => {
      const node: AutocompleteNode = {
        id: item.id,
        name: normalizeToFirst<string>(item.name),
      };

      const firstMedia: AssociatedMediaNode | undefined =
        normalizeToFirst<AssociatedMediaNode>(item['associatedMedia']);
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
