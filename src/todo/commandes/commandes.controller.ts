import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseInterceptors} from "@nestjs/common";

import {CreateCommandeDto} from "../dto/create-commande-dto";
import {UpdateCommandeDto} from "../dto/update-commande-dto";
import {CommandesService} from "./commandes.service";
import {Observable, of} from "rxjs";
import {builders} from "prettier/doc";





@Controller('commande')
export class CommandesController{
    constructor(private readonly commandeService :CommandesService) {}


    @Post()

    async create(@Res() response, @Body() createCommandeDto: CreateCommandeDto  ) {
        console.log('--------------',createCommandeDto)
        try {
            const newCommande = await this.commandeService.create(createCommandeDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'commande has been created successfully',
                newCommande });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Commande not created!',
                error: 'Bad Request'
            });
        }
    }

    @Get('/:id')
    async getCommande(@Res() response, @Param('id') commandeId: string) {
        try {
            const existingcommande = await this.commandeService.getCommande(commandeId);
            return response.status(HttpStatus.OK).json({
                message: 'commande found successfully',existingcommande,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }



    @Get()
    async findAll(@Res() response) {
        try {
            const commandeData = await this.commandeService.getAllCommande();
            return response.status(HttpStatus.OK).json({
                message: 'All commande data found successfully',commandeData,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }




    @Put('/:id')
    async updateCommande(@Res() response,@Param('id') commandeId: string,@Body() updatecommandeDto: UpdateCommandeDto) {

        try {
            const existingCommande = await this.commandeService.updateCommande(commandeId, updatecommandeDto);
            return response.status(HttpStatus.OK).json({
                message: 'Commande has been successfully updated',
                existingCommande,});
        } catch (err) {
            return response.status(HttpStatus.NOT_FOUND).json({
                message: 'Commande Not Found'
            });
        }
    }



    @Delete('/:id')
    async deleteCommande(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const deletedCommande= this.commandeService.deleteCommande(id);
            jsonResponse = {
                data: deletedCommande,
                message: `Commande with id ${id} was deleted.`,
                status: HttpStatus.OK
            }
        } catch(error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Commande with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }



}