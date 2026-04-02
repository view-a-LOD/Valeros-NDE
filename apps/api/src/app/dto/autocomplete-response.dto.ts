import { ApiProperty } from '@nestjs/swagger';
import { AutocompleteResponse } from '@valeros-ldkit/shared-types';
import { AutocompleteNodeDto } from './autocomplete-node.dto';

export class AutocompleteResponseDto implements AutocompleteResponse {
  @ApiProperty({
    description: 'Node results',
    type: [AutocompleteNodeDto],
  })
  results!: AutocompleteNodeDto[];

  @ApiProperty({
    description: 'Search suggestions',
    type: [String],
  })
  suggestions!: string[];
}
