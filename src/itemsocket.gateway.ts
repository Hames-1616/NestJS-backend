import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ItemsService } from './items/items.service';
import { Namespace, Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway()
export class ItemsocketGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  constructor(private itemservice: ItemsService) {}
  @WebSocketServer()
  io: Namespace;

  handleDisconnect(client: any) {}

  @OnEvent('Mongo')
  async handleConnection(client: Socket, payload) {
    await this.itemservice.watchitems();
    const allitems = await this.itemservice.getallitems();
    this.io.emit('items', allitems);
  }
  afterInit(server: any) {}
}
