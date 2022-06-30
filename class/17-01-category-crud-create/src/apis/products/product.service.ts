import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find(); //
  }
  findOne({ productId }) {
    return this.productRepository.findOne({ id: productId });
  }
  async create({ createProductInput }) {
    //카테고리를 데이터베이스에 저장
    const result = await this.productRepository.save({
      ...createProductInput,
    });
    console.log(result);
    return result;
  }

  async update({ productId, updateProdcutInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const newProduct = {
      ...product,
      ...updateProdcutInput,
    };
    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매가 완료된 상품입니다');
    }
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매가 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
