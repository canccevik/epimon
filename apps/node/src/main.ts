import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'

async function bootstrap(): Promise<void> {
  await NestFactory.createApplicationContext(AppModule)
}
bootstrap()
