import { Type } from "class-transformer";
import { 
  ArrayMinSize, 
  IsArray, 
  IsDateString, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsUrl, 
  MaxLength, 
  Min, 
  ValidateNested } from "class-validator";

export class CaracteristicaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome da característica não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição da característica não pode ser vazia' })
  descricao: string; 
}

export class ImagemProdutoDTO {
  @IsUrl(undefined, { message: 'A URL da imagem informada é inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição da imagem não pode ser vazia' })
  descricao: string;
}

export class CriaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor do produto precisa ser maior que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'A quantidade precisa ser um número igual ou maior que zero' })
  quantidadeDisponivel: number;

  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MaxLength(1000, { message: 'A descrição não pode ter mais que 1000 caracteres' })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3, { message: 'A lista de características do produto precisa ter pelo menos 3 itens' })
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1, { message: 'A lista de imagens do produto precisa ter pelo menos 1 item' })
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString()
  @IsNotEmpty({ message: 'A categoria não pode ser vazia' })
  categoria: string;

  @IsDateString()
  dataCriacao: Date;

  @IsDateString()
  dataAtualizacao: Date;
}