import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type CategorieDocument = Categorie & Document;

@Schema()
export class Categorie{
    @Prop()
    NomCat: string;



}

export const CategorieSchema = SchemaFactory.createForClass(Categorie);