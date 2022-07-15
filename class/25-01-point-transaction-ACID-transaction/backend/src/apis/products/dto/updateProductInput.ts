import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProductInput copy';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
