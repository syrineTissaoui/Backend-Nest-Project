import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Commande} from "../schemas/commandes.schema";
import {Model} from "mongoose";
import {Ccommande} from "../interfaces/commande.interface";
import {UpdateCommandeDto} from "../dto/update-commande-dto";
import {CreateCommandeDto} from "../dto/create-commande-dto";



@Injectable()
export class CommandesService {
    constructor(@InjectModel('Commande') private commandeModel: Model<Commande>) {
    }


    async create(commande: Commande) {

        const newProduct = await new this.commandeModel(commande);

        return newProduct.save();
    }

    async getAllCommande(): Promise<Commande[]> {
        const commandeData = await this.commandeModel.find().populate('produit');
        if (!commandeData || commandeData.length == 0) {
            throw new NotFoundException('Students data not found!');
        }
        return commandeData;
    }

    async updateCommande(commandeId: string, updateCommandeDto: UpdateCommandeDto): Promise<Ccommande> {
        const existingCommande = await this.commandeModel.findByIdAndUpdate(commandeId, updateCommandeDto, {new: true});
        if (!existingCommande) {
            throw new NotFoundException(`Product #${commandeId} not found`);
        }
        return existingCommande;
    }


    async getCommande(commandeId: string): Promise<Ccommande> {
        const existingCommande = await this.commandeModel.findById(commandeId).populate('produit').exec();
        if (!existingCommande) {
            throw new NotFoundException(`commande #${commandeId} not found`);
        }
        return existingCommande;
    }


    async deleteCommande(commandeId: string): Promise<Ccommande> {
        const deletedCommande= await this.commandeModel.findByIdAndDelete(commandeId);
        if (!deletedCommande) {
            throw new NotFoundException(`Commande #${commandeId} not found`);
        }
        return deletedCommande;
    }

}
