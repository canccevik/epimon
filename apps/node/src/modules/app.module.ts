import { validators } from '@config/index'
import { FeaturesModule } from '@features/features.module'
import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators: validators,
      isGlobal: true,
      useDotenv: true
    }),
    FeaturesModule
  ]
})
export class AppModule {}
