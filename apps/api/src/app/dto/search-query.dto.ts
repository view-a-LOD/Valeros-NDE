import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray } from 'class-validator';

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
    example: 'Growl',
    required: false,
    default: 'Growl',
  })
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
