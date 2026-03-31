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
      'Should support search operators/modifiers such as wildcards, fuzzy search, etc. See [Lucene Query Parser Syntax](https://lucene.apache.org/core/2_9_4/queryparsersyntax.html) for example standards. Unsure how far we should take this.',
    example: '"Van Gogh" paint* museum~',
    required: false,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({
    description:
      'Properties to retrieve for nodes. Uses [SPARQL Property Paths](https://www.w3.org/TR/sparql11-property-paths/) syntax for now. This might not be the right standard for this, but demonstrates the concept well. Should support retrieving specific properties, potentially N hops away or through inverse relations. See [GH issue](https://github.com/view-a-LOD/Valeros/issues/224) for more details. This might need to be (pre-)defined for each data layer instead of being passed as a parameter. [LDkit data schemas](https://ldkit.io/) might play a role for this.',
    type: [String],
    required: false,
    examples: {
      basic: {
        value: ['rdfs:label', 'schema:description'],
        summary: 'Basic properties',
      },
      sequence: {
        value: [
          'dc:creator|schema:author/(schema:givenName|schema:familyName|schema:birthDate|schema:deathDate)',
        ],
        summary: 'Details of creator/authors of search hit nodes (one hop)',
      },
      inverse: {
        value: [
          '^(schema:about|schema:mentions)^(schema:author|dc:creator)/(schema:givenName|schema:familyName|schema:birthDate|schema:deathDate)',
        ],
        summary:
          'Details of authors/creators of documents about search hit nodes (two hops, including inverse)',
      },
    },
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  properties?: string[];

  @ApiProperty({
    description:
      'Properties to use for searching the data. This _likely_ need to be (pre-)defined for each data layer instead of being passed as a parameter.',
    type: [String],
    required: false,
    examples: {
      basic: {
        value: ['rdfs:label', 'schema:description'],
        summary: 'Search in label and description',
      },
      sequence: {
        value: [
          'dc:creator|schema:author/(schema:givenName|schema:familyName)',
        ],
        summary: 'Search in creator/author names (one hop)',
      },
      inverse: {
        value: ['^(schema:about|schema:mentions)/rdfs:label'],
        summary:
          'Search in labels of documents that mention this node (one hop, inverse)',
      },
    },
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  searchProperties?: string[];

  @ApiProperty({
    description:
      'See [LDkit filtering](https://ldkit.io/docs/features/filtering) for syntax. A different syntax might make more sense here, work-in-progress. From what I\'ve seen, LDkit filtering seems to be strictly property-based, so a filter like "Nodes that refer to X in a way (via any property)" might require custom SPARQL queries. Note that the examples below are generally not yet functioning and are included as examples of what types of filtering might be important for using this API.',
    type: String,
    required: false,
    examples: {
      noFilter: {
        value: '{}',
        summary: 'No filter (return all)',
      },
      // byId: {
      //   value:
      //     '{"$id":"https://triplydb.com/academy/pokemon/id/pokemon/pikachu"}',
      //   summary: 'Get by ID (IRI)',
      // },
      // contains: {
      //   value: '{"label":{"$contains":"Pikachu"}}',
      //   summary: 'Contains text',
      // },
      // exactMatch: {
      //   value: '{"label":"Bulbasaur"}',
      //   summary: 'Exact match',
      // },
      // startsWith: {
      //   value: '{"label":{"$strStarts":"Bulb"}}',
      //   summary: 'Starts with',
      // },
      // inArray: {
      //   value: '{"label":{"$in":["Bulbasaur","Ivysaur","Venusaur"]}}',
      //   summary: 'In array',
      // },
      // regex: {
      //   value: '{"label":{"$regex":"^P.*u$"}}',
      //   summary: 'Regex pattern',
      // },
      typeFilter: {
        value:
          '{"@type":{"$in":["schema:CreativeWork","schema:Drawing","schema:ImageObject","schema:Map","schema:Photograph","schema:VideoObject","schema:Person","https://data.cbg.nl/pico#PersonObservation","foaf:Agent","http://www.nationaalarchief.nl/mdto#archiefvormer"]}}',
        summary: 'Nodes with "Visual" or "People" types',
      },
      hasRightsData: {
        value: '{"rights":{"$filter":"BOUND(?value)"}}',
        summary: 'Nodes that have a "rights" property',
      },
      refersToRembrandt: {
        value:
          '{"$filter":"?subject ?p <http://www.wikidata.org/entity/Q5598> || ?subject ?p <https://data.rkd.nl/artists/66219>"}',
        summary:
          'Nodes that refer to Rembrandt van Rijn in a way (via any property)',
      },
      artworksByDutchArtists: {
        value: '{"creator":{"nationality":"Dutch"}}',
        summary:
          'Nodes of Dutch creators (nested filter: node → creator → nationality)',
      },
      // TODO: Add examples for all filtering options
    },
  })
  @IsOptional()
  @IsString()
  filters?: string;

  @ApiProperty({
    description:
      'Properties to generate facet counts for. Takes into account the current query and applied filters. ⚠️ To discuss, do we need nested faceting? E.g., for every "type" facet, retrieve "medium" (sub-)facets as well.',
    example: ['type', 'creator', 'creator.nationality'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  facets?: string[];

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
