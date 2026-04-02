import { ApiProperty } from '@nestjs/swagger';
import { SearchValueObject, FacetValue } from '@valeros-ldkit/shared-types';

export class FacetValueDto implements FacetValue {
  @ApiProperty({
    description: 'Facet value IRI',
    example: 'http://www.wikidata.org/entity/Q5598',
  })
  '@id'!: string;

  @ApiProperty({
    description: 'Facet label',
    required: false,
  })
  label?: SearchValueObject[];

  @ApiProperty({
    description: 'Facet count',
    example: 42,
  })
  count!: number;

  @ApiProperty({
    description: 'Nested facet values',
    required: false,
  })
  facets?: Record<string, FacetValueDto[]>;
}
