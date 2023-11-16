import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
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
import axios from 'axios';

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


  // @Post("/upload")
  // @UseInterceptors(FileInterceptor('file',{
  //   storage : diskStorage({
  //     destination:"./uploads",
  //     filename:(req,file,cb)=>{
  //       cb(null, `${file.originalname}`)
  //     }
  //   })
  // }))
  // async uploadFile(){
  //   return "success"
  // }


  @Get("getimg/:id")
  async getimg(@Res() res: Response,@Param('id') name:String) {
    {
      const image = `https://raw.githubusercontent.com/Hames-1616/NestJS-backend/master/uploads/${name}`
      const response = await axios.get(image,{ responseType: 'arraybuffer' })
      res.set('Content-Type', 'image/png');
      res.send(response.data);
    }
  }

// @Get("/allitems")
// async getitems(@Headers('jwt') token){
//   const verified = await this.dbservice.checktoken(token)
//   if(verified) return await this.dbservice.allitems()
// }


  // @Get("getfile")
  // getFile(@Res() res: Response,@Body() pic:Fileparams) {
  //   const file = createReadStream(join(process.cwd(), `uploads/${pic.name}.png`));
  //   file.pipe(res);
  // }
}
