import { ApiProperty } from '@nestjs/swagger';

export class AutocompleteNodeDto {
  @ApiProperty({
    description: 'Node IRI',
    example: 'https://triplydb.com/academy/pokemon/id/pokemon/pikachu',
  })
  $id!: string;

  @ApiProperty({
    description: 'Node label',
    example: 'Pikachu',
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
