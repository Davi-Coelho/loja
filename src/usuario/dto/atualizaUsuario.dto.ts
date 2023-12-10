import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { EmailEhUnico } from "../validation/email-eh-unico.validator";

export class AtualizaUsuarioDto {

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @EmailEhUnico({ message: 'Já existe um usuário com este email' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  @IsOptional()
  senha: string;
}