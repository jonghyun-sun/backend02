import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  id: string;
  email: string;
}
export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext): ICurrentUser => {
    //아름은 내가 정하면 됨
    const ctx = GqlExecutionContext.create(context); // restapi의 context를 graphql용으로 변경하줘
    return ctx.getContext().req.user;
  },
);
