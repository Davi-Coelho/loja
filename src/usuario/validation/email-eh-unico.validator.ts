import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value);
    return !usuarioComEmailExiste;
  }
}

export const EmailEhUnico = (opcoesDeValicacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValicacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    })
  }
};