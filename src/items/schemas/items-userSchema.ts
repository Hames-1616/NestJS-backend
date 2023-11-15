import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({collection:'items',timestamps:true})
export class item{
    @Prop({required:true})
    name:string

    @Prop({required:true})
    price:number
}
export const itemschema = SchemaFactory.createForClass(item)