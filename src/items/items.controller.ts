import { Controller, Get ,Headers} from '@nestjs/common';
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
}
