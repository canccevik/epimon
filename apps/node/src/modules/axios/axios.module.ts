import { Global, Module } from '@nestjs/common'
import { AxiosProvider } from './axios.provider'

@Global()
@Module({
  providers: [AxiosProvider],
  exports: [AxiosProvider]
})
export class AxiosModule {}
