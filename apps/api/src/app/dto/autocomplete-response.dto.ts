import { ApiProperty } from '@nestjs/swagger';

export class AutocompleteNodeDto {
  @ApiProperty({
    description: 'Node IRI',
    example: 'http://www.wikidata.org/entity/Q5582',
  })
  $id!: string;

  @ApiProperty({
    description: 'Node label',
    example: 'Vincent van Gogh',
  })
  label?: string;
}

export class AutocompleteResponseDto {
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
