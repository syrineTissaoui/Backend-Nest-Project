import { Document } from 'mongoose';
import {Categorie} from "../schemas/categorie.schemas";
export interface Pproduit extends Document{
     readonly Nom:string;
     readonly Prix :number;
     readonly Image:string;
     readonly DateExp:string;
     readonly categorie:Categorie;

}