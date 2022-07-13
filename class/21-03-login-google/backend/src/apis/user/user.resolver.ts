import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/graphql/auth/graphql-auth.guard';
import { CurrentUser } from 'src/commons/graphql/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}
  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create({ email, hashedPassword, name, age });
  }

  @UseGuards(GqlAuthAccessGuard) ///'access' => 그냥 내가 정한 가드 이름
  @Query(() => String)
  fetchUser(
    @CurrentUser() currentUser: any, //
  ) {
    console.log('fetchUser 실행 완료!');
    console.log(currentUser);
  }
}
