import { Model } from 'mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {CreateProduitDto} from "../dto/create-produit-dto";
import {Pproduit} from "../interfaces/produit.interface";
import {Produit} from "../schemas/produits.schemas";
import {UpdateProduitDto} from "../dto/update-produit-dto";
import {Categorie} from "../schemas/categorie.schemas";


@Injectable()
export class ProduitsService {
    constructor(@InjectModel('Produit') private produitModel: Model<Produit>,
                @InjectModel('Categorie') private categorieModel: Model<Categorie>) {}

    async create(createProduitDto: CreateProduitDto): Promise<Produit> {
        const createdProduit = await new this.produitModel(createProduitDto);
        console.log('-object to add-------',createdProduit)
        return createdProduit.save();
    }
    // async create(produit:Produit) {
    //
    //     const newProduit= await new this.produitModel(produit);
    //
    //     return newProduit.save();
    // }

    async getAllProduit(): Promise<Produit[]> {
        const produitData = await this.produitModel.find().populate('categorie');
        if (!produitData || produitData.length == 0) {
            throw new NotFoundException('Students data not found!');
        }
        return produitData;
    }

    async updateProduit(ProduitId: number, updateProduitDto: UpdateProduitDto ): Promise<Produit> {
        const existingProduit = await this.produitModel.findByIdAndUpdate(ProduitId, updateProduitDto, { new: true });
        if (!existingProduit) {
            throw new NotFoundException(`Product #${ProduitId} not found`);
        }
        return existingProduit;
    }
    async getProduit(produitId: number): Promise<Produit> {
        const existingProduit = await this.produitModel.findById(produitId).populate('categorie').exec();
        if (!existingProduit) {
            throw new NotFoundException(`Student #${produitId} not found`);
        }
        return existingProduit;
    }

    async deleteProduit(ProduitId: number): Promise<Produit> {
        const deletedProduit = await this.produitModel.findByIdAndDelete(ProduitId);
        if (!deletedProduit) {
            throw new NotFoundException(`Product #${ProduitId} not found`);
        }
        return deletedProduit;
    }
}

