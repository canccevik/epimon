import { Injectable } from '@nestjs/common'
import { Block } from '../schemas'
import crypto from 'crypto'

@Injectable()
export class BlockService {
  public calculateHash(block: Block): string {
    return crypto
      .createHash('sha256')
      .update(
        block.timestamp +
          block.previousBlockHash +
          block.nonce +
          JSON.stringify(block.transactions).toString()
      )
      .digest('hex')
  }
}
