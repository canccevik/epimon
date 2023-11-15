import { validators } from '@config/index'
import { FeaturesModule } from '@features/features.module'
import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { AxiosModule } from './axios/axios.module'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators: validators,
      isGlobal: true,
      useDotenv: true
    }),
    FeaturesModule,
    AxiosModule
  ]
})
export class AppModule {}
