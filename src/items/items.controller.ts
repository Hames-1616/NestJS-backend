import { Controller, Get ,Headers, Param, Post} from '@nestjs/common';
import { ItemsService } from './items.service';
import { UsersService } from 'src/users/users.service';


@Controller('items')
export class ItemsController {
    
    constructor(private readonly dbservice:UsersService,private readonly itemservice:ItemsService,){}
    
    @Get("/all")
    async getallitems(@Headers('jwt') token){
        const verified = await this.dbservice.checktoken(token)
        return await this.itemservice.getallitems()
    }

    @Get("/list/:id")
    async getlist(@Headers('jwt') token,@Param('id') search:string){
        await this.dbservice.checktoken(token)
        return this.itemservice.fetchitem(search.replace(" ","_"))
    }

    @Post("/likeditem/:id")
    async likeditem(@Headers('jwt') token,@Param('id') search:string){
        await this.dbservice.checktoken(token)
        return await this.itemservice.addtoliked(search)
    }

    @Post("/dislikeditem/:id")
    async dislikeditem(@Headers('jwt') token,@Param('id') search:string){
        await this.dbservice.checktoken(token)
        return await this.itemservice.addtodisliked(search)
    }
    
    @Get("/getliked")
    async getalliked(@Headers('jwt') token:string){
        await this.dbservice.checktoken(token)
        return await this.itemservice.getalllikeditems()
    }

}
