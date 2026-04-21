import { NodeModel } from './node.model';

export type IsPartOfObject = NodeModel & {
  publisher?: NodeModel;
  license?: NodeModel;
};
