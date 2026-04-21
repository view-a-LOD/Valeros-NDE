import { NodeModel } from './node.model';

export type IsPartOfObject = NodeModel & {
  publisher?: {
    id: string;
    type: string;
    name: string;
  };
  license?: {
    id: string;
    type: string;
    name: string;
  };
};
