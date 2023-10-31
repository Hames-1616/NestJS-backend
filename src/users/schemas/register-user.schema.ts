import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ collection: 'users', timestamps: true })
export class user {
    @Prop({required:true})
    name:string;

    @Prop({required:true})
    email:string;

    @Prop({required:true})
    password:string;
}

export const userschema = SchemaFactory.createForClass(user);