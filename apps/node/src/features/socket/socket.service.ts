import { Injectable } from '@nestjs/common'
import { InjectIoClientProvider, IoClient, OnConnect, OnDisconnect } from 'nestjs-io-client'

@Injectable()
export class SocketService {
  constructor(@InjectIoClientProvider() private readonly io: IoClient) {}

  @OnConnect()
  public async connect(): Promise<void> {
    console.log('✅ Connected to the network.')
  }

  @OnDisconnect()
  public async disconnect(): Promise<void> {
    console.log('❌ Network disconnected.')
  }
}
