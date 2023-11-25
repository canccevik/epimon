import { INestApplication } from '@nestjs/common'
import { Config, ENV } from './config'
import helmet from 'helmet'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import { HttpExceptionFilter, TransformInterceptor, ValidationPipe } from '@epimon/common'
import { Reflector } from '@nestjs/core'

export function setupApp(app: INestApplication): void {
  const config = app.get<Config>(ENV)

  app.enableCors()
  app.setGlobalPrefix(config.GLOBAL_PREFIX)

  app.use(helmet())
  app.use(compression())
  app.use(mongoSanitize())

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()))
}
