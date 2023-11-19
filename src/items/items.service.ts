import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { item } from './schemas/items-userSchema';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(item.name) private itemModel: Model<item>) {}

  searchlist: item[] = [];
  async getallitems() {
    const allitems = await this.itemModel.find().exec();
    this.searchlist = allitems;
    return allitems;
  }

  fetchitem(search: string) {
    return this.searchlist.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }
}
