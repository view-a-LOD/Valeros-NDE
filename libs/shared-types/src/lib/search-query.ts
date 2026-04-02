export interface SearchQuery {
  query?: string;
  properties?: string[];
  searchProperties?: string[];
  filters?: string;
  facets?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  languages?: string[];
  highlightMatches?: boolean;
  returnHighlightedSnippets?: boolean;
  snippetLength?: number;
}
