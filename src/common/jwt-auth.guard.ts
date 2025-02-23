import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthHelper } from './auth.helper';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers['authorization'];
    if (!token || token.length < 7) throw new UnauthorizedException();

    return AuthHelper.checkIfUserAuthorized(request, token.substring(7));
  }
}
