import {
  flatten,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    }); //
  }
  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }
  async create({ createProductInput }) {
    // //1.상품만 등록하는 경우
    // //카테고리를 데이터베이스에 저장
    // const result = await this.productRepository.save({
    //   ...createProductInput,
    // });
    // console.log(result);
    // return result;

    //2.상품과 거래위치를 같이 등록하는 경우
    const { productSalesLocation, productCategoryId, ...product } =
      createProductInput;
    const result = await this.productSaleslocationRepository.save({
      ...productSalesLocation,
    });

    const result2 = await this.productRepository.save({
      ...product,
      productSaleslocation: result, //데이터 통째로 넣기
      productCategory: { id: productCategoryId }, //데이터id만 넣기 => 데이터 전체를 보고 싶으면 find해서 데이터 넘겨주면 됨=>아니면 바로 위 result 형식으로 써주면 됨
    });
    return result2;
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
  async delete({ productId }) {
    // //1.실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // result.affected ? true : false;

    // //2.소프트 삭제(삭제하는 척만) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // //3.소프트 삭제 - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // //4. 소프트 삭제(typeorm 제공) - softRemove
    // this.productRepository.softRemove({ id: productId }); //id로만 삭제 가능

    //5. 소프트 삭제(typeorm 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
