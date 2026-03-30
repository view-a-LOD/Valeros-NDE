import { ApiProperty } from '@nestjs/swagger';

export class SearchResponseDto {
  @ApiProperty({
    description: 'Node IRI',
    example: 'https://triplydb.com/academy/pokemon/id/pokemon/pikachu',
  })
  $id!: string;

  @ApiProperty({
    description: 'Node label',
    example: 'Pikachu',
  })
  label?: string;
}
