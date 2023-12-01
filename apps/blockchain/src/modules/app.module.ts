import { validators } from '@config/index'
import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { DatabaseModule } from './database/database.module'
import { FeaturesModule } from '@features/features.module'
import { AxiosModule, LoggerModule } from '@epimon/common'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators: validators,
      useDotenv: true,
      isGlobal: true
    }),
    FeaturesModule,
    DatabaseModule,
    LoggerModule,
    AxiosModule
  ]
})
export class AppModule {}
