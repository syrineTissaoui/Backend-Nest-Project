import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {ProduitsService} from "./produit.service";
import {CreateProduitDto} from "../dto/create-produit-dto";
import {UpdateProduitDto} from "../dto/update-produit-dto";
import {diskStorage} from "multer";
import {FileInterceptor} from "@nestjs/platform-express";
import * as path from "path";
import {Observable, of} from "rxjs";
import {join} from "path";









@Controller('produit')
export class ProduitsController{
    constructor(private readonly produitsService :ProduitsService) {}

    @Post('upload')

    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './src/assets',
            }),
        }),
    )
    uploadfile(
        @UploadedFile() file: Express.Multer.File,
        @Body() createProduitDto: CreateProduitDto,
    ): Promise<any> {
        createProduitDto.Image = file.filename;
        console.log(createProduitDto);
        return this.produitsService.create(createProduitDto);
    }
    @Post()
    @UseInterceptors(
        FileInterceptor('Image', {
            storage: diskStorage({
                destination: './src/assets',
                filename: (req, Image, cb) => {
                    const filename: string = Array(10)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    const extension = path.parse(Image.originalname).ext;

                    return cb(null, `${filename}${extension}`);
                },
            }),
        }),
    )
    async create(@Res() response, @Body() createproduitDto:CreateProduitDto, @UploadedFile() Image :Express.Multer.File ) {
        console.log("---DTO---",createproduitDto);


        try {
            createproduitDto.Image=Image.filename;
            const newProduit = await this.produitsService.create(createproduitDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'product has been created successfully',
                newProduit,Image});
        } catch (err) {
            console.log(err)

        }
    }

    @Get('/:id')
    async getProduit(@Res() response, @Param('id') produitId: number) {
        try {
            const existingProduit = await this.produitsService.getProduit(produitId);
            return response.status(HttpStatus.OK).json({
                message: 'Product found successfully',existingProduit,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('file/:filename')
    findFile(@Param('filename') file,@Res() res):Observable<Object>{
        return of(res.sendfile(join(process.cwd(),'src/assets/'+ file)));
    }

    @Get()
    async findAll(@Res() response) {
        try {

            const produitData = await this.produitsService.getAllProduit();
            return response.status(HttpStatus.OK).json({
                message: 'All products data found successfully',produitData,});
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }


    @Put('/:id')
    @UseInterceptors(
        FileInterceptor('Image', {
            storage: diskStorage({
                destination: './src/assets',
                filename: (req, Image, cb) => {
                    const filename: string = Array(10)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    const extension = path.parse(Image.originalname).ext;

                    return cb(null, `${filename}${extension}`);
                },
            }),
        }),
    )
    async updateProduit(@Res() response,@Param('id') produitId: number,
                        @Body() updateProduitDto: UpdateProduitDto , @UploadedFile() Image :Express.Multer.File ) {

        try {
            updateProduitDto.Image=Image.filename;
            const existingProduit = await this.produitsService.updateProduit(produitId, updateProduitDto);
            return response.status(HttpStatus.OK).json({
                message: 'Product has been successfully updated',
                existingProduit});
        } catch (err) {
            return response.status(HttpStatus.NOT_FOUND).json({
                message: 'Product Not Found'
            });
        }
    }



    @Delete('/:id')
    async deleteProduit(@Res() res, @Param('id') id): Promise<JSON> {
        let jsonResponse;

        try {
            const deletedProduit = this.produitsService.deleteProduit(id);
            jsonResponse = {
                data: deletedProduit,
                message: `Produit with id ${id} was deleted.`,
                status: HttpStatus.OK
            }
        } catch(error) {
            jsonResponse = jsonResponse = {
                data: null,
                message: `Produit with id ${id} was not found.`,
                status: HttpStatus.NOT_FOUND
            }
        }

        return res.status(jsonResponse.status).json(jsonResponse);
    }



}