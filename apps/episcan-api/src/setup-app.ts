import { INestApplication } from '@nestjs/common'
import { Config, ENV } from './config'

export function setupApp(app: INestApplication): void {
  const config = app.get<Config>(ENV)

  app.enableCors()
  app.setGlobalPrefix(config.GLOBAL_PREFIX)
}
