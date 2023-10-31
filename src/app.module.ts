import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    UsersModule,
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
