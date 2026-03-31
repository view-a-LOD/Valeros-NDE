import { ApiProperty } from '@nestjs/swagger';

export class NodeDto {
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

export class FacetValueDto {
  @ApiProperty({
    description: 'Facet value (IRI)',
    example: 'http://www.wikidata.org/entity/Q5598',
  })
  value!: string;

  @ApiProperty({
    description: 'Facet label',
    example: 'Rembrandt van Rijn',
    required: false,
  })
  label?: string;

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

export class SearchResponseDto {
  @ApiProperty({
    description: 'Search results',
    type: [NodeDto],
  })
  results!: NodeDto[];

  @ApiProperty({
    description: 'Total number of results',
    example: 156,
  })
  totalResults!: number;

  @ApiProperty({
    description: 'Facet counts for requested facet properties',
    required: false,
    example: {
      type: [
        { value: 'http://schema.org/Person', label: 'Person', count: 42 },
        {
          value: 'http://schema.org/CreativeWork',
          label: 'Creative Work',
          count: 38,
          // TODO: Not sure if we need to support hierarchical/nested facets
          facets: {
            medium: [
              {
                value: 'http://vocab.getty.edu/aat/300033618',
                label: 'Oil painting',
                count: 15,
              },
              {
                value: 'http://vocab.getty.edu/aat/300033973',
                label: 'Drawing',
                count: 12,
              },
              {
                value: 'http://vocab.getty.edu/aat/300041273',
                label: 'Prints',
                count: 11,
              },
            ],
          },
        },
      ],
      creator: [
        {
          value: 'http://www.wikidata.org/entity/Q5598',
          label: 'Rembrandt van Rijn',
          count: 15,
        },
        {
          value: 'http://www.wikidata.org/entity/Q41264',
          label: 'Johannes Vermeer',
          count: 8,
        },
      ],
      'creator.nationality': [
        {
          value: 'http://www.wikidata.org/entity/Q55',
          label: 'Dutch',
          count: 23,
        },
        {
          value: 'http://www.wikidata.org/entity/Q142',
          label: 'French',
          count: 12,
        },
        {
          value: 'http://www.wikidata.org/entity/Q38',
          label: 'Italian',
          count: 7,
        },
      ],
    },
  })
  facets?: Record<string, FacetValueDto[]>;
}
