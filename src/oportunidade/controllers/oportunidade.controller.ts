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

  @Get('/valor/:valor')
  @HttpCode(HttpStatus.OK)
  findByValor(@Param('valor') valor: number): Promise<Oportunidade[]> {
    return this.oportunidadeService.findByValor(valor);
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

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.oportunidadeService.delete(id);
  }
}
