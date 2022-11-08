import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Categorie} from "./categorie.schemas";
import mongoose from "mongoose";
import {Produit} from "./produits.schemas";



@Schema()
export class Commande{
    @Prop({required:true,type:mongoose.Schema.Types.ObjectId , ref:"Produit" })
    produit: Produit;

    @Prop({default:Date.now()})
    date: Date;

    @Prop({default:"nouvelle"})
    etat: String;


}

export const CommandeSchema = SchemaFactory.createForClass(Commande);
export type commandedocument = Commande & Document;