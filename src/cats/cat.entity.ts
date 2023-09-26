import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    raca: string;

    @Column()
    corOlhos: string;

}