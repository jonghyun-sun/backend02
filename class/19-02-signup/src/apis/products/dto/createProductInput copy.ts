import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductSaleslocationInput } from 'src/apis/productsSaleslocation/dto/productSaleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;

  @Field(() => ProductSaleslocationInput) //그냥 ProductSaleslocation은 objectType이기에 새로 inputType만들어줘야 한다
  productSalesLocation: ProductSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;

  @Field(()=>[String])
  productTags:string[]
}
