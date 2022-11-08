import {IsDate, IsNotEmpty, IsString, MaxLength} from "class-validator";
import {Produit} from "../schemas/produits.schemas";


export class CreateCommandeDto {


    @IsNotEmpty()
    produit:Produit;


    @IsNotEmpty()
    date:Date;


    @IsNotEmpty()
    etat:String;




}