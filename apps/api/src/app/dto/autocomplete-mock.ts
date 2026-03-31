import { AutocompleteResponseDto } from './autocomplete-response.dto';

export const AUTOCOMPLETE_MOCK_DATA: AutocompleteResponseDto = {
  results: [
    {
      $id: 'http://www.wikidata.org/entity/Q5582',
      label: 'Vincent van Gogh',
    },
  ],
  suggestions: ['Vincent van Gogh', 'Vermeer'],
};
