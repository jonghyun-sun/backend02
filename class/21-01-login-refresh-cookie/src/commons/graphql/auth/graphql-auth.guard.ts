import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    //context의 타입은 ExecutionContext야
    const ctx = GqlExecutionContext.create(context); // restapi의 context를 graphql용으로 변경하줘
    return ctx.getContext().req;
  }
}
