import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RES } from 'utils';
import { JWT } from 'utils';

@Injectable()
export class AdminRefreshGuard implements CanActivate {
  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if ((await this.validateRequest(request)) === true) {
      return await this.validateRequest(request);
    } else {
      throw new HttpException(RES.error(HttpStatus.UNAUTHORIZED, 'Forbidden resource', 'คุณไม่มีสิทธิ์เข้าถึงข้อมูล'), HttpStatus.UNAUTHORIZED)

    }
  }

  private async validateRequest(request: any): Promise<boolean> {
    const headerAuth = request.headers['authorization'];
    if (headerAuth) {
      try {
        const token = headerAuth.split(' ')[1];
        const exposeData = await JWT.refresh.expose(token);

        if (exposeData && exposeData.tokenType === 'refresh' && exposeData.role === 'admin') {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log('error at validate auth token');
        console.error(error);
        return false;
      }
    }

    return false;
  }
}
