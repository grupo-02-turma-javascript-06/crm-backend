import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OportunidadeModule } from './oportunidade/oportunidade.module';

@Module({
  imports: [OportunidadeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
