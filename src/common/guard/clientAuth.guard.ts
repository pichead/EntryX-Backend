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
import { UserService } from 'src/v1/user/user.service';
import { JWT, RES } from 'utils';

@Injectable()
export class ClientAuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService

  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if ((await this.validateRequest(request)) === true) {
      return await this.validateRequest(request);
    } else {
      throw new HttpException(RES.error(HttpStatus.FORBIDDEN, 'Forbidden resource', 'คุณไม่มีสิทธิ์เข้าถึงข้อมูล'), HttpStatus.FORBIDDEN)
    }
  }

  private async validateRequest(request: any): Promise<boolean> {

    const headerAuth = request.headers['authorization'];

    if (headerAuth) {
      try {
        const token = headerAuth.split(' ')[1];
        const exposeData = await JWT.access.expose(token);
        if (exposeData && exposeData.tokenType === 'access') {
          const findUserByEmail = await this.userService.findUserByEmail(exposeData.email)

          if (!findUserByEmail || findUserByEmail.role !== 1) {
            return false
          }
          else {
            request.user = findUserByEmail
            return true
          }
        }
        else {
          return false
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
