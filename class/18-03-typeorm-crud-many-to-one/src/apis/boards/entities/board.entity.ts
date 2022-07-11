import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //table이라는 것을 알려주는 것
@ObjectType() //graphql타입이라는 것을 알려주는 것
export class Board {
  @PrimaryGeneratedColumn('increment') //table이라는 것을 알려주는 것
  @Field(() => Int) //graphql타입이라는 것을 알려주는 것
  number: number;

  @Column()
  @Field(() => String)
  wirter: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
