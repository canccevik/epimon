import { validators } from '@config/index'
import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators: validators,
      isGlobal: true,
      useDotenv: true
    })
  ]
})
export class AppModule {}
