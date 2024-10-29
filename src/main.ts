import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'utils/constant';
import { VersioningType } from '@nestjs/common';
import { CustomInterceptors } from './common/interceptor/response.interceptor';
import { ExceptionResponse } from './common/exception/exception.exception';
import { ConfigService } from '@nestjs/config';

const exceptRes = new ExceptionResponse();

async function bootstrap() {
  console.log("process.env.NODE_ENV : ", process.env.NODE_ENV)
  console.log("process.env.NODE_ENV2 : ", process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env`)

  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalInterceptors(new CustomInterceptors(exceptRes));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.get('API_VERSION') || '1',
  })
  app.setGlobalPrefix(env.apiPrefix)
  app.enableCors({
    credentials: true,
    // origin: [...configService.get('ORIGIN').split(', ')],
    optionsSuccessStatus: 200,
    allowedHeaders: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
  });
  await app.listen(env.appPort);
}
bootstrap();
