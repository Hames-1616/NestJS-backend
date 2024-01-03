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

  async addtoliked(name:string){
   const product = this.fetchitem(name);
    await this.itemModel.findOneAndUpdate({
      name : product[0].name
    },{
      liked:true
    })
  }

  async addtodisliked(name:string){
    const product = this.fetchitem(name);
     await this.itemModel.findOneAndUpdate({
       name : product[0].name
     },{
       liked: false
     })
   }

   async getalllikeditems(){
    return await this.itemModel.find({
      liked: true
    },{})
   }
}
