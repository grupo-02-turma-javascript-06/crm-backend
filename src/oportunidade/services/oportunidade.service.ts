import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Oportunidade } from '../entities/oportunidade.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OportunidadeService {
  constructor(
    @InjectRepository(Oportunidade)
    private oportunidadeRepository: Repository<Oportunidade>,
  ) {}

  async findAll(): Promise<Oportunidade[]> {
    return this.oportunidadeRepository.find({});
  }

  async findById(id: number): Promise<Oportunidade> {
    const oportunidade = await this.oportunidadeRepository.findOne({
      where: {
        id,
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
    });
  }

  // Método de pesquisa para maior valor
  async findOportunidadePrecoMaiorQue(valor: number): Promise<Oportunidade[]> {
    return this.oportunidadeRepository
      .createQueryBuilder('oportunidade')
      .where('oportunidade.valor > :valor', { valor })
      .orderBy('oportunidade.valor', 'ASC')
      .getMany();
  }

  // Método de pesquisa para menor valor
  async findOportunidadePrecoMenorQue(valor: number): Promise<Oportunidade[]> {
    return this.oportunidadeRepository
      .createQueryBuilder('oportunidade')
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
      where: { status },
    });
  }

  async create(oportunidade: Oportunidade): Promise<Oportunidade> {
    return await this.oportunidadeRepository.save(oportunidade);
  }

  async update(oportunidade: Oportunidade): Promise<Oportunidade> {
    if (!oportunidade.id || oportunidade.id <= 0)
      throw new HttpException('Oportunidade inválida!', HttpStatus.BAD_REQUEST);
    await this.findById(oportunidade.id);
    return await this.oportunidadeRepository.save(oportunidade);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.oportunidadeRepository.delete(id);
  }
}
