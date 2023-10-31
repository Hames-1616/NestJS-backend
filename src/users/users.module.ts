import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userschema } from './schemas/register-user.schema';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports:[
    JwtModule.register({
      secret:"secret",
      global:true,
      signOptions:{
        expiresIn:'3600s',
      },
    }),
    MongooseModule.forRoot("mongodb+srv://hames:hames2356@cluster0.wctctwo.mongodb.net/nestjs"),
    MongooseModule.forFeature([{name : user.name,schema:userschema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
