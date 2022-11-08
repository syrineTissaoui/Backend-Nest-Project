import {MiddlewareConsumer, Module} from '@nestjs/common';

import {MongooseModule} from "@nestjs/mongoose";
import {ProduitsController} from "./produit.controller";
import {ProduitsService} from "./produit.service";
import {ProduitSchema} from "../schemas/produits.schemas";
import {MulterModule} from "@nestjs/platform-express";
import {CategorieSchema} from "../schemas/categorie.schemas";






@Module({
    imports: [MongooseModule.forFeature([{name:'Produit',schema:ProduitSchema}]),
        MongooseModule.forFeature([{name:'Categorie',schema:CategorieSchema}])


    ],
    controllers: [ProduitsController],
    providers: [ProduitsService],

})
export class ProduitsModule {}