import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // ✅ Convert payloads to DTO class instances
    whitelist: true,  // ✅ Remove unexpected fields
    forbidNonWhitelisted: true,  // ✅ Reject requests with extra fields
    forbidUnknownValues: true,  // ✅ Reject requests with unknown types
    transformOptions: { enableImplicitConversion: false }  // ✅ Enforce strict type conversion
  }));
  const config = new DocumentBuilder()
    .setTitle('CRUD')
    .setDescription('This project is about to practice the crud operations')
    .setVersion('1.0')
    // .addTag('otp')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.use(bodyParser.json());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
