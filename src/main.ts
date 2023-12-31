import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationErrorFilter } from './exceptionFilter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationErrorFilter());
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
