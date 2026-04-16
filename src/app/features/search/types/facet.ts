export interface FacetValue {
  type: 'FacetValue';
  value: string;
  count: number;
}

export interface Facet {
  type: 'OrderedCollection';
  name: string;
  orderedItems: FacetValue[];
}
