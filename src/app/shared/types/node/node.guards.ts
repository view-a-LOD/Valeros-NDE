import { NodeModel } from './node.model';

export function isNodeModel(value: any): value is NodeModel {
  return value && typeof value === 'object' && 'id' in value;
}
