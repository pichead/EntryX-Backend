import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { RES } from 'utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }
    else{

      const request = context.switchToHttp().getRequest()
      const user = request.user

      if(roles.includes(user.role)){
        return true
      }
      else{
        RES.error(400,"You don't have permission","คุณไม่มีสิทธิ์เข้าใช้งาน")
      }
    }

  }
}
