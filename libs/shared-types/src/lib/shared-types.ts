import { SchemaInterface } from 'ldkit';
import { rdfs } from 'ldkit/namespaces';

export const NodeSchema = {
  label: rdfs.label,
} as const;

export type NodeType = SchemaInterface<typeof NodeSchema>;

export interface SearchQuery {
  endpoints?: string[];
  filters?: string;
}
