import { AutocompleteResponseDto } from './autocomplete-response.dto';

export const AUTOCOMPLETE_MOCK_DATA: AutocompleteResponseDto = {
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
  suggestions: ['Pikachu', 'Pichu'],
};
