import { Document } from 'mongoose';
import {Produit} from "../schemas/produits.schemas";

export interface Ccommande extends Document{
    readonly produit:Produit;
    readonly date:Date;
    readonly etat:String;


}