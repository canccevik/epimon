import helmet from 'helmet'
import compression from 'compression'
import mongoSanitize from 'express-mongo-sanitize'
import { Config, ENV } from './config'
import { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@core/pipes'
import { HttpExceptionFilter } from '@core/filters'
import { LoggingInterceptor, TransformInterceptor } from '@core/interceptors'
import { Reflector } from '@nestjs/core'
import { Logger } from 'nestjs-pino'

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

  if (config.isDev) {
    const logger = app.get<Logger>(Logger)
    app.useGlobalInterceptors(new LoggingInterceptor(logger))
  }
}
