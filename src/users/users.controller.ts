import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { user } from './schemas/register-user.schema';
import { LoginModel } from './schemas/login-user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from "path";
import { createReadStream } from 'fs';
import { join } from 'path';

interface Fileparams{
  name:string
}

@Controller('users')
export class UsersController {
  constructor(private readonly dbservice: UsersService) {}




  @Post("allusers")
  async getallusers(@Headers('jwt') token){
    const verified = await this.dbservice.checktoken(token);
    if(verified) return this.dbservice.getallusers()
  }


  @Post('createuser')
  addusers(@Body() userdata: user) {
    return this.dbservice.create(userdata);
  }

  @Post("login")
  async login(@Body() login:LoginModel){
    return this.dbservice.login(login)
  }


  @Post("/upload")
  @UseInterceptors(FileInterceptor('file',{
    storage : diskStorage({
      destination:"./uploads",
      filename:(req,file,cb)=>{
        cb(null, `${file.originalname}`)
      }
    })
  }))
  async uploadFile(){
    return "success"
  }

  @Get("getimg")
  getimg(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), `uploads/img.png`));
    file.pipe(res);
  }


  @Get("getfile")
  getFile(@Res() res: Response,@Body() pic:Fileparams) {
    const file = createReadStream(join(process.cwd(), `uploads/${pic.name}.png`));
    file.pipe(res);
  }
}
