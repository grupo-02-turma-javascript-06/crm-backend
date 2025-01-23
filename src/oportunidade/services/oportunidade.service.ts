import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Oportunidade } from '../entities/oportunidade.entity';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteService } from '../../cliente/services/cliente.service';
import { UsuarioService } from '../../usuario/services/usuario.service';

@Injectable()
export class OportunidadeService {
  constructor(
    @InjectRepository(Oportunidade)
    private oportunidadeRepository: Repository<Oportunidade>,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
  ) {}

  async findAll(): Promise<Oportunidade[]> {
    return this.oportunidadeRepository.find({
      relations: {
        cliente: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Oportunidade> {
    const oportunidade = await this.oportunidadeRepository.findOne({
      where: {
        id,
      },
      relations: {
        cliente: true,
        usuario: true,
      },
    });

    if (!oportunidade)
      throw new HttpException(
        'Oportunidade não encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return oportunidade;
  }

  async findByNome(nome: string): Promise<Oportunidade[]> {
    return this.oportunidadeRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        cliente: true,
        usuario: true,
      },
    });
  }

  // Método de pesquisa para maior valor
  async findOportunidadePrecoMaiorQue(valor: number): Promise<Oportunidade[]> {
    return this.oportunidadeRepository
      .createQueryBuilder('oportunidade')
      .leftJoin('oportunidade.cliente', 'cliente')
      .leftJoin('oportunidade.usuario', 'usuario')
      .where('oportunidade.valor > :valor', { valor })
      .orderBy('oportunidade.valor', 'ASC')
      .getMany();
  }

  // Método de pesquisa para menor valor
  async findOportunidadePrecoMenorQue(valor: number): Promise<Oportunidade[]> {
    return this.oportunidadeRepository
      .createQueryBuilder('oportunidade')
      .leftJoin('oportunidade.cliente', 'cliente')
      .leftJoin('oportunidade.usuario', 'usuario')
      .where('oportunidade.valor < :valor', { valor })
      .orderBy('oportunidade.valor', 'DESC')
      .getMany();
  }

  async findByStatus(status: string): Promise<Oportunidade[]> {
    if (!['aberta', 'fechada', 'perdida'].includes(status)) {
      throw new Error(
        'Status inválido. Os valores permitidos são: aberta, fechada, perdida.',
      );
    }

    return this.oportunidadeRepository.find({
      where: {
        status,
      },
      relations: {
        cliente: true,
        usuario: true,
      },
    });
  }

  async changeStatus(params): Promise<UpdateResult> {
    if (!['aberta', 'fechada', 'perdida'].includes(params.status)) {
      throw new Error(
        'Status inválido. Os valores permitidos são: aberta, fechada, perdida.',
      );
    }

    await this.findById(params.id);

    return await this.oportunidadeRepository
      .createQueryBuilder()
      .update(Oportunidade)
      .set({ status: params.status })
      .where('id = :id', { id: params.id })
      .execute();
  }

  async create(oportunidade: Oportunidade): Promise<Oportunidade> {
    await this.clienteService.findById(oportunidade.cliente.id);

    await this.usuarioService.findById(oportunidade.usuario.id);

    const data_atual = new Date();
    oportunidade.abertura = data_atual;
    oportunidade.data_atualizacao = data_atual;

    return await this.oportunidadeRepository.save(oportunidade);
  }

  async update(oportunidade: Oportunidade): Promise<Oportunidade> {
    if (!oportunidade.id || oportunidade.id <= 0)
      throw new HttpException('Oportunidade inválida!', HttpStatus.BAD_REQUEST);
    await this.findById(oportunidade.id);

    await this.clienteService.findById(oportunidade.cliente.id);

    await this.usuarioService.findById(oportunidade.usuario.id);

    const data_atual = new Date();
    oportunidade.data_atualizacao = data_atual;

    return await this.oportunidadeRepository.save(oportunidade);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.oportunidadeRepository.delete(id);
  }
}
