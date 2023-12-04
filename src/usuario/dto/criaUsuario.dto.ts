import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailEhUnico } from "../validation/email-eh-unico.validator";

export class CriaUsuarioDTO {

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @EmailEhUnico({ message: 'Já existe um usuário com este email' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}