import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDto } from './dto/atualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome  = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);

    return { 
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'usuario criado com sucesso'
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map( 
      usuario => new ListaUsuarioDTO(
        usuario.id, 
        usuario.nome
        )
      );

    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: String, @Body() novosDados: AtualizaUsuarioDto) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);

    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuário atualizado com sucesso'
    }
  }
}
