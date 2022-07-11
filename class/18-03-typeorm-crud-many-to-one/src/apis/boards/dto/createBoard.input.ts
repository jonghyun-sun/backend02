import { Field, InputType } from '@nestjs/graphql';

@InputType() //restapi에서도 input은 inputtype이라고 따로 적어었다
export class CreateBoardInput {
  @Field(() => String)
  writer: string;
  @Field(() => String)
  title: string;
  @Field(() => String)
  contents: string;
}
