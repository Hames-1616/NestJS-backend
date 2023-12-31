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

  constructor(@InjectModel(user.name) private readonly userModel: Model<user>,private readonly jwtService: JwtService) {}

  async create(userdata: user) {
    userdata.password = await bcrypt.hash(userdata.password, 8);
    const checkUser = await this.userModel.findOne({ email: userdata.email });
    if (checkUser === null) {
      await this.userModel.create(userdata)
      return 'User Created'
    }
    else throw new BadRequestException('User Already Present');
  }

  async login(login: LoginModel) {
    const checkUser = await this.userModel.findOne({ email: login.email });
    if (!checkUser) throw new BadRequestException("User with this email Doesn't exists");
    const checkPass = await bcrypt.compare(login.password, checkUser!.password);
    if (!checkPass) throw new BadRequestException('Incorrect Password');
    const payload = { sub:checkUser._id,username:checkUser.name};
    return {
        access_token: await this.jwtService.sign(payload),
     };
  }

  async getallusers(){
    return await this.userModel.find().exec()
  }

  async checktoken(token){
    var currentuser
    if(!token) throw new UnauthorizedException()
    try {
        const id =  this.jwtService.decode(token)
        currentuser = this.userModel.findById(id.sub)
        if(!user) throw new UnauthorizedException
      } catch(error) {
        throw new UnauthorizedException()
      }
      return currentuser;
  }
}
