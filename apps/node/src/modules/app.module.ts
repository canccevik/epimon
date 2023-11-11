import { Config, ENV, validators } from '@config/index'
import { Module } from '@nestjs/common'
import { EnvalidModule } from 'nestjs-envalid'
import { IoClientModule } from 'nestjs-io-client'

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators: validators,
      isGlobal: true,
      useDotenv: true
    }),
    IoClientModule.forRootAsync({
      useFactory: (config: Config) => {
        return {
          uri: config.ROOT_SOCKET_URI
        }
      },
      inject: [ENV]
    })
  ]
})
export class AppModule {}
