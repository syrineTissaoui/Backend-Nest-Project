import {MiddlewareConsumer, Module} from '@nestjs/common';

import {MongooseModule} from "@nestjs/mongoose";

import {ProduitSchema} from "../schemas/produits.schemas";

import {CommandeSchema} from "../schemas/commandes.schema";
import {CommandesController} from "./commandes.controller";
import {CommandesService} from "./commandes.service";
import {CategorieSchema} from "../schemas/categorie.schemas";






@Module({
    imports: [MongooseModule.forFeature([{name:'Commande',schema:CommandeSchema}]),
        MongooseModule.forFeature([{name:'Produit',schema:ProduitSchema}]),
    ],
    controllers: [CommandesController],
    providers: [CommandesService],
})
export class CommandesModule {}