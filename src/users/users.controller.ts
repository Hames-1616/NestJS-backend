import {
  Body,
  Controller,
  Get,
  Head,
  Headers,
  Post,
  UnauthorizedException,

} from '@nestjs/common';
import { UsersService } from './users.service';
import { user } from './schemas/register-user.schema';
import { LoginModel } from './schemas/login-user.model';


@Controller('users')
export class UsersController {
  constructor(private readonly dbservice: UsersService) {}

  @Get('allusers')
  async allusers(@Headers('jwt') token) {
    const verified = await this.dbservice.checktoken(token)
    if(verified) return this.dbservice.findall()
    
  }

  @Post('addusers')
  addusers(@Body() userdata: user) {
    return this.dbservice.create(userdata);
  }

  @Post("login")
  login(@Body() login:LoginModel){
    return this.dbservice.login(login)
  }
}
