import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // ✅ Convert payloads to DTO class instances
    whitelist: true,  // ✅ Remove unexpected fields
    forbidNonWhitelisted: true,  // ✅ Reject requests with extra fields
    forbidUnknownValues: true,  // ✅ Reject requests with unknown types
    transformOptions: { enableImplicitConversion: false }  // ✅ Enforce strict type conversion
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
