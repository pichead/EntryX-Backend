import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const SWAGGER_API_DOCUMENT_ENDPOINT = `${configService.get('SWAGGER_URL') || '/api'}`;
export const SWAGGER_API_TITLE = `${configService.get('APP_NAME')}`;
export const SWAGGER_API_DESCRIPTION = `${configService.get('APP_NAME')}'s API Documentation.`;
export const SWAGGER_API_VERSION = `${configService.get('API_VERSION')}`;
export const SERVER_BASEURL = `${configService.get('SERVER_URL') || 'https://server'}`;
export const SERVER_DOCUMENT_URL = `${SERVER_BASEURL}${SWAGGER_API_DOCUMENT_ENDPOINT}`;
export const TEST_SERVER_BASEURL = `${configService.get('TEST_URL') || 'https://test-server'}`;
export const LOCAL_BASEURL = `http://localhost:${configService.get('APP_PORT')}`;
