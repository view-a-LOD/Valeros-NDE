export interface NodeModel {
  id: string;
  type?: string | string[];
  name?: string | string[];
  [key: string]: any;
}
