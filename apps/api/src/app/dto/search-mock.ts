import { SearchResponseDto } from './search-response.dto';

export const SEARCH_MOCK_DATA: SearchResponseDto = {
  results: [
    {
      $id: 'http://www.wikidata.org/entity/Q5582',
      label: 'Vincent van Gogh',
    },
    {
      $id: 'http://www.wikidata.org/entity/Q5598',
      label: 'Rembrandt van Rijn',
    },
  ],
  totalResults: 156,
  facets: {
    type: [
      {
        value: 'http://schema.org/Person',
        label: 'Person',
        count: 150,
      },
    ],
  },
};
