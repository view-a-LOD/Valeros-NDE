import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NodeType } from '@valeros-ldkit/shared-types';
import { AppService } from './app.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import { SchemaSearchInterface } from 'ldkit';

@ApiTags('search')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  @ApiOperation({
    summary: 'Search Linked Data endpoints',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns matching nodes',
    type: [SearchResponseDto],
  })
  async search(@Query() query: SearchQueryDto): Promise<NodeType[]> {
    const endpoints: string[] = [
      'https://api.triplydb.com/datasets/academy/pokemon/sparql',
      'https://api.triplydb.com/datasets/Triply/iris/sparql',
    ];

    let filters: SchemaSearchInterface<NodeType> | undefined;
    if (query.filters) {
      try {
        filters = JSON.parse(query.filters);
      } catch (error) {
        throw new Error('Invalid JSON in filters parameter');
      }
    }

    return this.appService.search(endpoints, filters);
  }
}
