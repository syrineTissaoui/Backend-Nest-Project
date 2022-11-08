import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Categorie} from "./categorie.schemas";
import mongoose from "mongoose";



@Schema()
export class Produit{
    @Prop({required:true})
    Nom: string;

    @Prop({required:true})
    Prix: number;

    @Prop({required:true})
    Image: string;

    @Prop({required:true})
    DateExp: string;

    @Prop({required:true ,type:mongoose.Schema.Types.ObjectId , ref:"Categorie" })
    categorie: Categorie;
}

export const ProduitSchema = SchemaFactory.createForClass(Produit);
export type produitdocument = Produit & Document;