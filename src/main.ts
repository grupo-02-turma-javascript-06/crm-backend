import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('2Connect')
    .setDescription('Projeto 2Connect')
    .setContact(
      'Grupo 02 - Turma JavaScript06 ',
      'https://github.com/grupo-02-turma-javascript-06',
      'grupo02turmajavascript06@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
