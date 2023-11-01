import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './schemas/register-user.schema';
import { Model, Query } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginModel } from './schemas/login-user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(user.name) private userModel: Model<user>,private readonly jwtService: JwtService) {}

  async create(userdata: user) {
    userdata.password = await bcrypt.hash(userdata.password, 8);
    const checkUser = await this.userModel.findOne({ email: userdata.email });
    if (checkUser === null) {
      const newuser = await this.userModel.create(userdata)
      const payload = { sub:newuser._id,username:newuser.name};
      return {
          access_token: await this.jwtService.sign(payload),
       };
    }
    else throw new BadRequestException('User Already Present');
  }

  async login(login: LoginModel) {
    const checkUser = await this.userModel.findOne({ email: login.email });
    if (!checkUser) throw new BadRequestException("User with this email Doesn't exists");
    const checkPass = await bcrypt.compare(login.password, checkUser!.password);
    if (!checkPass) throw new BadRequestException('Incorrect Password');

    return {Status:"Login Successful"}
  }


  async checktoken(token){
    if(!token) throw new UnauthorizedException()
    try {
        const id =  this.jwtService.decode(token)
        const user = this.userModel.findById(id.sub)
        if(!user) throw new UnauthorizedException
      } catch(error) {
        throw new UnauthorizedException()
      }
      return true;
  }

 
}
