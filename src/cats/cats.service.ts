import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrUpdateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {

    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>
    ) { }

    findAll(): Promise<Cat[]> {
        return this.catsRepository.find();
    }

    save(dto: CreateOrUpdateCatDto): Promise<Cat> {
        return this.catsRepository.save(dto);
    }

    findById(id: number): Promise<Cat | null> {
        return this.catsRepository.findOneBy({id});
    }

    async update(id: number, dto: CreateOrUpdateCatDto): Promise<void> {
        await this.catsRepository.update(id, dto);
    }

    async remove(id: number): Promise<void> {
        await this.catsRepository.delete(id);
    }

}
