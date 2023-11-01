import {
  Body,
  Controller,
  Get,
  Headers,
  Post
} from '@nestjs/common';
import { UsersService } from './users.service';
import { user } from './schemas/register-user.schema';
import { LoginModel } from './schemas/login-user.model';


@Controller('users')
export class UsersController {
  constructor(private readonly dbservice: UsersService) {}



  @Post('createuser')
  addusers(@Body() userdata: user) {
    return this.dbservice.create(userdata);
  }

  @Post("login")
  async login(@Body() login:LoginModel,@Headers("jwt") token){
    const verified = await this.dbservice.checktoken(token)
    if(verified) return this.dbservice.login(login)
  }
}
