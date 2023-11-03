import helmet from 'helmet'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import { Config, ENV } from './config'
import { INestApplication } from '@nestjs/common'
import { HttpExceptionFilter } from './core'

export function setupApp(app: INestApplication): void {
  const config = app.get<Config>(ENV)

  app.enableCors()
  app.setGlobalPrefix(config.GLOBAL_PREFIX)

  app.use(helmet())
  app.use(compression())
  app.use(mongoSanitize())

  app.useGlobalFilters(new HttpExceptionFilter())
}
