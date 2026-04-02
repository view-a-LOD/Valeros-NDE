import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AutocompleteQuery } from '@valeros-ldkit/shared-types';

export class AutocompleteQueryDto implements AutocompleteQuery {
  @ApiProperty({
    description: '(Partial) search query',
    example: 'vi',
    required: true,
  })
  @IsString()
  query!: string;

  @ApiProperty({
    description:
      'Language tags for literal filtering ([BCP47 format](https://en.wikipedia.org/wiki/IETF_language_tag))',
    example: ['en', 'nl'],
    required: false,
  })
  @IsOptional()
  languages?: string[];
}
