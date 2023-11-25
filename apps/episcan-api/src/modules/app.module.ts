import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { validators } from '@config/index'
import { LoggerModule } from '@epimon/common'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators,
      isGlobal: true,
      useDotenv: true
    }),
    LoggerModule
  ]
})
export class AppModule {}
