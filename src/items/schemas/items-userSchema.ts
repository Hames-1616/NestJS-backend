import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({collection:'items',timestamps:true})
export class item{
    @Prop({required:true})
    name:string

    @Prop({required:true})
    price:number

    @Prop({required:true})
    info:string

    @Prop({required:true})
    liked:boolean
}
export const itemschema = SchemaFactory.createForClass(item)