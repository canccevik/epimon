import { NestFactory } from '@nestjs/core'
import { AppModule } from '@modules/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  await app.listen(3003)
}
bootstrap()
