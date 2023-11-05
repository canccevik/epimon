import { validators } from '@config/index'
import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { DatabaseModule } from './database/database.module'
import { FeaturesModule } from '@features/features.module'
import { LoggerModule } from './logger/logger.module'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators: validators,
      useDotenv: true,
      isGlobal: true
    }),
    FeaturesModule,
    DatabaseModule,
    LoggerModule
  ]
})
export class AppModule {}
