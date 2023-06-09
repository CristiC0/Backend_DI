import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger: Logger = new Logger(RolesGuard.name);
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    let roles;
    try {
      roles = (JSON.parse(atob(req.cookies.token?.split('.')[1])) as any).role;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return requiredRoles.some((role) => roles?.includes(role));
  }
}
