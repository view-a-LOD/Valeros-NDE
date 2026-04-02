import { ApiProperty } from '@nestjs/swagger';
import {
  SearchValueObject,
  JsonLdPropertyValue,
  SearchNode,
} from '@valeros-ldkit/shared-types';

export class NodeDto implements SearchNode {
  @ApiProperty({
    description: 'Node IRI',
    example: 'http://www.wikidata.org/entity/Q5582',
  })
  '@id'?: string;

  @ApiProperty({
    description: 'Node type(s)',
    example: ['http://schema.org/Person'],
    required: false,
  })
  '@type'?: string[];

  @ApiProperty({
    description: 'Node label',
    required: false,
  })
  label?: SearchValueObject[];

  @ApiProperty({
    description: 'Node description',
    required: false,
  })
  description?: SearchValueObject[];

  // Additional properties
  [key: string]: JsonLdPropertyValue;
}
