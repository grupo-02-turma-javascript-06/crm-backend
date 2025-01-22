import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../entities/cliente.entity';

@Controller('/cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findbyId(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clienteService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get('/cliente/:cliente')
  @HttpCode(HttpStatus.OK)
  findByCliente(@Param('cliente') cliente: string): Promise<Cliente[]> {
    return this.clienteService.findByCliente(cliente);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.update(cliente);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.delete(id);
  }
}
