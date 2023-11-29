import { Controller, Get, Query } from '@nestjs/common'
import { SearchService } from '../services'
import { Message, SearchResult } from '@epimon/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Message('Search completed successfully.')
  public async search(@Query('value') value: string): Promise<SearchResult> {
    return this.searchService.search(value)
  }
}
