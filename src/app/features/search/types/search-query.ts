export interface SearchQuery {
  page: number;
  size?: number;
  q?: string;
  sort?: string;
  filter?: string | string[];
}
