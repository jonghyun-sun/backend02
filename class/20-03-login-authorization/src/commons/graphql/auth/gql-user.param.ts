import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    //아름은 내가 정하면 됨
    const ctx = GqlExecutionContext.create(context); // restapi의 context를 graphql용으로 변경하줘
    return ctx.getContext().req.user;
  },
);
