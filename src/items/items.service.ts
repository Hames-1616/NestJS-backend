import { Injectable, Next } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { item } from './schemas/items-userSchema';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(item.name) private itemModel: Model<item>,private eventEmitter: EventEmitter2) {}

  searchlist: item[] = [];
  async getallitems() {
    const allitems = await this.itemModel.find().exec();
    this.searchlist = allitems;
    return allitems;
  }

  async watchitems(){
    const s = await this.itemModel.collection.watch()
    s.on("change",Next=>{
      this.eventEmitter.emit("Mongo",
      {
        Next
      })
    })
  }

  fetchitem(search: string) {
    return this.searchlist.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }
}
