import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { item, itemschema } from 'src/items/schemas/items-userSchema';
import { UsersService } from 'src/users/users.service';
import { ItemsocketGateway } from '../itemsocket.gateway';

@Module({
  imports:[
  UsersModule,
    MongooseModule.forFeature([
      {name: item.name,schema:itemschema}
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports:[ItemsService]
})
export class ItemsModule {}
