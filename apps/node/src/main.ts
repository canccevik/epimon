import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { createServer } from 'http'
import { Config, ENV } from './config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule)
  const config = app.get<Config>(ENV)

  createServer((_, res) => res.end()).listen(config.PORT)
}
bootstrap()
