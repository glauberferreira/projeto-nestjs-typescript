import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { CatsService } from './cats.service';
// import { Cat } from './interfaces/cat.interface';
import { Response } from 'express';
import { CreateOrUpdateCatDto } from './dto/create-cat.dto';
import { Cat } from './cat.entity';

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
    async create(@Body() dto: CreateOrUpdateCatDto, @Res() res: Response) {
        const cat = await this.catsService.save(dto);
        res.status(HttpStatus.CREATED).json(cat);
    }    

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateOrUpdateCatDto, @Res() res: Response) {
        const gatoEncontrado = await this.catsService.findById(id);
        if(gatoEncontrado){
            await this.catsService.update(id, dto);
            res.status(HttpStatus.NO_CONTENT).send();
        } else {
            res.status(HttpStatus.NOT_FOUND).send();
        }
    }

}
