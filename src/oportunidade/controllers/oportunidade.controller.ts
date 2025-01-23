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
import { Oportunidade } from '../entities/oportunidade.entity';
import { OportunidadeService } from '../services/oportunidade.service';
import { UpdateResult } from 'typeorm';

@Controller('/oportunidades')
export class OportunidadeController {
  constructor(private readonly oportunidadeService: OportunidadeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Oportunidade[]> {
    return this.oportunidadeService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Oportunidade> {
    return this.oportunidadeService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Oportunidade[]> {
    return this.oportunidadeService.findByNome(nome);
  }

  @Get('/preco/maior-que/:valor')
  @HttpCode(HttpStatus.OK)
  async findOportunidadePrecoMaiorQue(
    @Param('valor') valor: number,
  ): Promise<Oportunidade[]> {
    return this.oportunidadeService.findOportunidadePrecoMaiorQue(valor);
  }

  @Get('/preco/menor-que/:valor')
  @HttpCode(HttpStatus.OK)
  async findOportunidadePrecoMenorQue(
    @Param('valor') valor: number,
  ): Promise<Oportunidade[]> {
    return this.oportunidadeService.findOportunidadePrecoMenorQue(valor);
  }

  @Get('/status/:status')
  @HttpCode(HttpStatus.OK)
  findByStatus(@Param('status') status: string): Promise<Oportunidade[]> {
    return this.oportunidadeService.findByStatus(status);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() oportunidade: Oportunidade): Promise<Oportunidade> {
    return this.oportunidadeService.create(oportunidade);
  }

  @Put()
  @HttpCode(HttpStatus.CREATED)
  update(@Body() oportunidade: Oportunidade): Promise<Oportunidade> {
    return this.oportunidadeService.update(oportunidade);
  }

  @Put('/mudar-status')
  @HttpCode(HttpStatus.OK)
  chageStatus(@Body() params): Promise<UpdateResult> {
    return this.oportunidadeService.changeStatus(params);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.oportunidadeService.delete(id);
  }
}
