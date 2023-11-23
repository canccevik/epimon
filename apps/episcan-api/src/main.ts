import { NestFactory } from '@nestjs/core'
import { AppModule } from '@modules/app.module'
import { Config, ENV } from './config'
import { setupApp } from './setup-app'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const config = app.get<Config>(ENV)

  setupApp(app)

  await app.listen(config.PORT)
}
bootstrap()
