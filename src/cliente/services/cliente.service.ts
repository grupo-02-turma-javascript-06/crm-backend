import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async findById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: {
        id,
      },
    });

    if (!cliente)
      throw new HttpException(
        `Cliente ${cliente} não encontrado(a)!`,
        HttpStatus.NOT_FOUND,
      );

    return cliente;
  }
  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async findByCliente(nome: string): Promise<Cliente[]> {
    return this.clienteRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(cliente: Cliente): Promise<Cliente> {
    return await this.clienteRepository.save(cliente);
  }
  async update(cliente: Cliente): Promise<Cliente> {
    await this.findById(cliente.id);

    return await this.clienteRepository.save(cliente);
  }
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.clienteRepository.delete(id);
  }
}
