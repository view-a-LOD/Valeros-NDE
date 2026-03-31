import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AutocompleteQueryDto {
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
