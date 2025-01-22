import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { OportunidadeModule } from './oportunidade/oportunidade.module';
import { Oportunidade } from './oportunidade/entities/oportunidade.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_crm',
      entities: [Usuario, Oportunidade],
      synchronize: true,
      logging: true,
    }),
    UsuarioModule,
    OportunidadeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
