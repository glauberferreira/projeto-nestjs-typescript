import { IsAlpha, IsIn, IsNotEmpty, MinLength, NotEquals } from "class-validator";

export class CreateOrUpdateCatDto {
    
    // id: number;

    @IsNotEmpty()
    @MinLength(2, {message: 'O nome do gato tem que ter no mínimo 2 caracteres.'})
    nome: string;
    
    @IsNotEmpty()
    @IsIn(['Siamês', 'Sphinx', 'Persa'])
    raca: string;

    @IsNotEmpty()
    @IsAlpha("pt-BR", {message: 'faiou'})
    corOlhos: string;
}