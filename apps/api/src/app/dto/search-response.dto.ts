import { ApiProperty } from '@nestjs/swagger';
import { SearchResponse } from '@valeros-ldkit/shared-types';
import { FacetValueDto } from './facet-value.dto';
import { NodeDto } from './node.dto';

export class SearchResponseDto implements SearchResponse {
  @ApiProperty({
    description: 'Search results',
    type: [NodeDto],
  })
  results!: NodeDto[];

  @ApiProperty({
    description: 'Total number of results',
  })
  totalResults!: number;

  @ApiProperty({
    description: 'Number of results returned',
  })
  limit!: number;

  @ApiProperty({
    description: 'Number of results skipped',
  })
  offset!: number;

  @ApiProperty({
    description: 'Facet counts for requested facet properties',
    required: false,
  })
  facets?: Record<string, FacetValueDto[]>;
}
