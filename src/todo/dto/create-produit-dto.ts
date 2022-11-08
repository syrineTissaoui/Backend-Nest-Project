import {IsDate, IsNotEmpty, IsString, MaxLength} from "class-validator";
import {Categorie} from "../schemas/categorie.schemas";

export class CreateProduitDto {


    @IsNotEmpty()
     Nom:string;

    @IsNotEmpty()
    Prix:number;

    @IsNotEmpty()
    Image:string;

    @IsNotEmpty()
    DateExp:string;


    @IsNotEmpty()
    categorie:Categorie;

}