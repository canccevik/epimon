import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { Config, ENV } from './config'
import { setupSwagger } from './setup-swagger'
import { setupApp } from './setup-app'
import { BlockchainService } from '@features/blockchain/services'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const config = app.get<Config>(ENV)
  const blockchainService = app.get<BlockchainService>(BlockchainService)

  setupApp(app)
  setupSwagger(app)

  await app.listen(config.PORT)
  blockchainService.syncChainWithRoot().catch(() => {})
}
bootstrap()
