import { Module } from '@nestjs/common';
import {CategorieController} from "./categorie.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {CategorieService} from "./categorie.service";
import {CategorieSchema} from "../schemas/categorie.schemas";



@Module({
  imports: [MongooseModule.forFeature([{name:'Categorie',schema:CategorieSchema}]),
  ],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CategorieModule {}