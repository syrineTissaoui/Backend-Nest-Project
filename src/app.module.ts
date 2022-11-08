import {MiddlewareConsumer, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ProduitsModule} from "./todo/produit/produit.module";
import {MulterModule} from "@nestjs/platform-express";
import {CommandesModule} from "./todo/commandes/commandes.module";
import {CategorieModule} from "./todo/categorie/categorie.module";



@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI , {useNewUrlParser:true}),
    ProduitsModule,CommandesModule,CategorieModule

  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
