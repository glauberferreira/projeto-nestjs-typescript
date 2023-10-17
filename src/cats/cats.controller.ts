import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {

    constructor(private catsService: CatsService) { }

    @Get()
    findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const gatoEncontrado = await this.catsService.findById(id);
        if (gatoEncontrado) {
            res.status(HttpStatus.OK).json(gatoEncontrado);
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const gatoEncontrado = await this.catsService.findById(id);
        if (gatoEncontrado) {
            await this.catsService.remove(id);
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

    @Post()
    create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
        this.catsService.create(createCatDto);
        res.status(HttpStatus.CREATED).json(createCatDto);
    }    

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() cat: Cat, @Res() res: Response) {
        const indexGatoEncontrado = this.catsService.findIndexById(id);
        if(indexGatoEncontrado >= 0){
            this.catsService.update(indexGatoEncontrado, cat);
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

}
