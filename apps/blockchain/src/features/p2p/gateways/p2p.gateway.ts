import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway(8080, { cors: { origin: '*' } })
export class P2PGateway {
  @WebSocketServer()
  public server: Server
}
