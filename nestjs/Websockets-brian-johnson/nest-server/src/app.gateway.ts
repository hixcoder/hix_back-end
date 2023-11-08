import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ' + client.id);
  }
  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(
    client: Socket,
    data: { message: string; messageId: string },
  ): void {
    const temp = data.message;
    data.message = 'others: ' + temp;
    client.broadcast.emit('msgToClient', data);
    data.message = 'me: ' + temp;
    client.emit('msgToClient', data);
    // console.log(text);
  }
}
