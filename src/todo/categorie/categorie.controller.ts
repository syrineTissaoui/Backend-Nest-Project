import {Controller, Get, HttpStatus, Param, Res} from "@nestjs/common";
import {CategorieService} from "./categorie.service";



@Controller('categorie')
export class CategorieController {
    constructor(private readonly categorieService: CategorieService) {
    }
    @Get()
    async findAll(@Res() response) {
        try {
            const categorieData = await this.categorieService.getAllCategorie();
            return response.status(HttpStatus.OK).json({
                message: 'All categorie data found successfully',categorieData,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getCat(@Res() response, @Param('id') catId: number) {
        try {
            const existingCategorie = await this.categorieService.getCat(catId);
            return response.status(HttpStatus.OK).json({
                message: 'Product found successfully',existingCategorie});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}