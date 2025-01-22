import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Usuario } from "../entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ){}

    async findAll(): Promise<Usuario[]>{

        return await this.usuarioRepository.find()
    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if(!usuario)
            throw new HttpException(`Usuário ${usuario} não encontrado!`, HttpStatus.NOT_FOUND);

        return usuario;
    }

    async findByNome(nome: string): Promise<Usuario[]> {

        return await this.usuarioRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            }
        })
    }

    async findByEmail(email: string): Promise<Usuario | undefined> {

        return await this.usuarioRepository.findOne({
            where: {
                email
            }
        })
    }

    async create(usuario: Usuario): Promise<Usuario> {

        return await this.usuarioRepository.save(usuario);

    }
    
    async update(usuario: Usuario): Promise<Usuario> {
        await this.findById(usuario.id);

        const buscaUsuario = await this.findByEmail(usuario.email);

        if (buscaUsuario && buscaUsuario.id !== usuario.id) 
            throw new HttpException(`Já existe um usuário com o email ${usuario.email}!`, HttpStatus.BAD_REQUEST);

        return await this.usuarioRepository.save(usuario);
    }
    
}