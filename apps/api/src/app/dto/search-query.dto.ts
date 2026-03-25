import { ApiProperty } from '@nestjs/swagger';
import { NodeType } from '@valeros-ldkit/shared-types';
import { IsOptional, IsString, IsArray, IsObject } from 'class-validator';
import { SchemaSearchInterface } from 'ldkit';

export class SearchQueryDto {
  @ApiProperty({
    description: 'SPARQL endpoints to search',
    example: [
      'https://api.triplydb.com/datasets/academy/pokemon/sparql',
      'https://api.triplydb.com/datasets/Triply/iris/sparql',
    ],
    type: [String],
    required: false,
    default: [
      'https://api.triplydb.com/datasets/academy/pokemon/sparql',
      'https://api.triplydb.com/datasets/Triply/iris/sparql',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  endpoints?: string[];

  @ApiProperty({
    description: 'See https://ldkit.io/docs/features/filtering',
    type: String,
    required: false,
    examples: {
      noFilter: {
        value: '{}',
        summary: 'No filter (return all)',
      },
      byId: {
        value:
          '{"$id":"https://triplydb.com/academy/pokemon/id/pokemon/pikachu"}',
        summary: 'Get by ID (IRI)',
      },
      contains: {
        value: '{"label":{"$contains":"Pikachu"}}',
        summary: 'Contains text',
      },
      exactMatch: {
        value: '{"label":"Bulbasaur"}',
        summary: 'Exact match',
      },
      startsWith: {
        value: '{"label":{"$strStarts":"Bulb"}}',
        summary: 'Starts with',
      },
      inArray: {
        value: '{"label":{"$in":["Bulbasaur","Ivysaur","Venusaur"]}}',
        summary: 'In array',
      },
      regex: {
        value: '{"label":{"$regex":"^P.*u$"}}',
        summary: 'Regex pattern',
      },
      // TODO: Add examples for all filtering options
    },
  })
  @IsOptional()
  @IsString()
  filters?: string;
}
