import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  LOCAL_BASEURL,
  SERVER_BASEURL,
  SERVER_DOCUMENT_URL,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_DOCUMENT_ENDPOINT,
  SWAGGER_API_TITLE,
  SWAGGER_API_VERSION,
  TEST_SERVER_BASEURL,
} from './constant';

export const initializeSwagger = (app: INestApplication) => {
  const server = `${SERVER_BASEURL}`;
  const testServer = `${TEST_SERVER_BASEURL}`;
  const local = `${LOCAL_BASEURL}`;
  const docs = `${SERVER_DOCUMENT_URL}`;

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_TITLE)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_VERSION)
    .addServer(local)
    .addServer(testServer)
    .addServer(server)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_DOCUMENT_ENDPOINT, app, document);

  const logger = new Logger('Documentation');
  logger.verbose(`API Documentation for "${server}" is available at "${docs}"`);
};
