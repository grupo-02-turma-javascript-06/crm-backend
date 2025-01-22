import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oportunidade } from './entities/oportunidade.entity';
import { OportunidadeController } from './controllers/oportunidade.controller';
import { OportunidadeService } from './services/oportunidade.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Oportunidade]),
    ClienteModule,
    UsuarioModule,
  ],
  controllers: [OportunidadeController],
  providers: [OportunidadeService],
  exports: [TypeOrmModule],
})
export class OportunidadeModule {}
