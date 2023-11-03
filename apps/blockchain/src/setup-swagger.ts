import { INestApplication } from '@nestjs/common'
import { Config, ENV } from './config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { version } from '../package.json'

export function setupSwagger(app: INestApplication): void {
  const config = app.get<Config>(ENV)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Epimon')
    .setDescription("Epimon's official API documentation.")
    .setVersion(version)
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('/', app, document)
  SwaggerModule.setup(config.GLOBAL_PREFIX, app, document)
}
