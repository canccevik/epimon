import { validators } from '@config/index'
import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators: validators,
      useDotenv: true,
      isGlobal: true
    }),
    DatabaseModule
  ]
})
export class AppModule {}
