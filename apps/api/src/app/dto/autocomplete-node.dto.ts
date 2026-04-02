import { ApiProperty } from '@nestjs/swagger';
import { AutocompleteNode } from '@valeros-ldkit/shared-types';

export class AutocompleteNodeDto implements AutocompleteNode {
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
