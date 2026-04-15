import { NodeModel } from './node.model';

export type AssociatedMediaObject = NodeModel & {
  contentUrl?: string;
  thumbnailUrl?: string;
  encodingFormat?: string;
  isBasedOn?: {
    id?: string;
    encodingFormat?: string;
  };
};
