import { Module } from '@nestjs/common'
import { P2PGateway } from './gateways'

@Module({
  providers: [P2PGateway],
  exports: [P2PGateway]
})
export class P2PModule {}
