import { SearchResponseDto } from './search-response.dto';

export const SEARCH_MOCK_DATA: SearchResponseDto = {
  results: [
    {
      $id: 'https://triplydb.com/academy/pokemon/id/pokemon/pikachu',
      label: 'Pikachu',
    },
    {
      $id: 'https://triplydb.com/academy/pokemon/id/pokemon/pinsir',
      label: 'Pinsir',
    },
  ],
  totalResults: 156,
  facets: {
    type: [
      {
        value: 'https://triplydb.com/academy/pokemon/vocab/Pokémon',
        label: 'Pokémon',
        count: 150,
      },
    ],
  },
};
