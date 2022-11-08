import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Categorie} from "../schemas/categorie.schemas";
import {Ccategorie} from "../interfaces/categorie.interface";
import {Pproduit} from "../interfaces/produit.interface";





@Injectable()
export class CategorieService {
    constructor(@InjectModel('Categorie') private categorieModel: Model<Categorie>) {
    }
    async getAllCategorie(): Promise<Categorie[]> {
        const categorieData = await this.categorieModel.find();

        return categorieData;
    }
    async getCat(catId: number): Promise<Categorie> {
        const existingCategorie= await this.categorieModel.findById(catId).exec();
        if (!existingCategorie) {
            throw new NotFoundException(`categorie #${catId} not found`);
        }
        return existingCategorie;
    }


}