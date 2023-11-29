import { Module } from '@nestjs/common'
import { SearchController } from './controllers'
import { SearchService } from './services'

@Module({
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
