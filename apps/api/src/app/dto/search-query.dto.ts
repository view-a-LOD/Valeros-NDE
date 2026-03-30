import { ApiProperty } from '@nestjs/swagger';
import { NodeType } from '@valeros-ldkit/shared-types';
import {
  IsOptional,
  IsString,
  IsArray,
  IsInt,
  Min,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { SchemaSearchInterface } from 'ldkit';
import { Type } from 'class-transformer';

export class SearchQueryDto {
  @ApiProperty({
    description:
      'See [LDkit filtering](https://ldkit.io/docs/features/filtering) for syntax. Note that a different syntax might make more sense here, work-in-progress.',
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

  @ApiProperty({
    description: 'Field to sort by',
    example: 'label',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    description:
      'Sort direction (ignored if sortBy is not provided, defaults to asc)',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Number of results to return',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: 'Number of results to skip',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @ApiProperty({
    description:
      'Language tags for literal filtering ([BCP47 format](https://en.wikipedia.org/wiki/IETF_language_tag))',
    example: ['en', 'nl'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiProperty({
    description: 'Highlight search term matches in full text fields',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  highlightMatches?: boolean;

  @ApiProperty({
    description:
      'Return highlighted snippets (truncated sections of text with highlights)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  returnHighlightedSnippets?: boolean;

  @ApiProperty({
    description:
      'Max snippet length in characters (ignored if snippets is not true)',
    example: 200,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  snippetLength?: number;
}
