import { ApiProperty } from '@nestjs/swagger';
import { ValueObject, NodeObject } from 'jsonld';

export type SearchValueObject = ValueObject & {
  highlight?: string;
  snippet?: string;
};

export type JsonLdPropertyValue = NodeObject[keyof NodeObject];

export type SearchNodeObject = NodeObject & {
  [key: string]: JsonLdPropertyValue;
};

export class NodeDto implements SearchNodeObject {
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
