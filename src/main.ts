import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationErrorFilter } from './exceptionFilter';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from "path"



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new ValidationErrorFilter());
  await app.listen(3000, "0.0.0.0");
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
