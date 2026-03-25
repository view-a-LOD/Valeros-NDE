import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NodeType } from '@valeros-ldkit/shared-types';
import { AppService } from './app.service';
import { SearchQueryDto } from './dto/search-query.dto';

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
  })
  async search(@Query() query: SearchQueryDto): Promise<NodeType[]> {
    const endpoints = query.endpoints || [];
    const searchTerm = query.searchTerm || '';

    if (endpoints.length === 0 || !searchTerm) {
      return [];
    }

    return this.appService.search(endpoints, searchTerm);
  }
}
