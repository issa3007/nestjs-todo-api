import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< Updated upstream

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
=======
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Todo app')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

>>>>>>> Stashed changes
  await app.listen(3000);
}
bootstrap();
