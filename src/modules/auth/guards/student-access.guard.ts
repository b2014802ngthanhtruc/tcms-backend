import { JsonWebTokenError } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { AUTH_ERROR } from 'src/content/errors';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STUDENT_ACCESS_STRATEGY } from '../strategies';

@Injectable()
export class StudentAccessGuard extends AuthGuard(STUDENT_ACCESS_STRATEGY) {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);
    }

    if (err || !user) {
      throw err || new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);
    }
    return super.handleRequest(err, user, info, context);
  }
}
