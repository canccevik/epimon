import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { validators } from '@config/index'
import { AxiosModule, LoggerModule } from '@epimon/common'
import { FeaturesModule } from '@features/features.module'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators,
      isGlobal: true,
      useDotenv: true
    }),
    FeaturesModule,
    LoggerModule,
    AxiosModule
  ]
})
export class AppModule {}
