import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { UsersController } from './users/users.controller';
import { ItemsController } from './items/items.controller';
import { UsersService } from './users/users.service';
import { ItemsService } from './items/items.service';





@Module({
  imports: [
    UsersModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
