import { NodeModel } from './node/node.model';

export interface SearchResponse {
  id: string;
  type: 'OrderedCollectionPage';
  partOf: {
    id: string;
    type: 'OrderedCollection';
    totalItems: number;
    first?: string;
    last?: string;
  };
  next?: string;
  prev?: string;
  startIndex: number;
  orderedItems: NodeModel[];
}
