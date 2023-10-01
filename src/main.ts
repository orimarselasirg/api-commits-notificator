import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan'
import { CORS } from './constans/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService)
  app.use(morgan('dev'))
  app.enableCors(CORS)
  app.setGlobalPrefix('api/v1')
  // await app.listen(configService.get('PORT'));
  await app.listen(process.env.PORT || 8080);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
