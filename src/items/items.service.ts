import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { item } from './schemas/items-userSchema';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(item.name) private itemModel:Model<item>){}


    async getallitems(){
        return await this.itemModel.find().exec()
    }
}
