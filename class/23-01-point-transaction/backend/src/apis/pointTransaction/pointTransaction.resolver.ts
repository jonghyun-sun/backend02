import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CurrentUser,
  ICurrentUser,
} from 'src/commons/graphql/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/commons/graphql/auth/graphql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.sercice';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    this.pointTransactionService.create({ impUid, amount, currentUser });
  }
}
