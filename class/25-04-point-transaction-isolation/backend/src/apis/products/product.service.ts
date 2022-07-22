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
import { ProductTag } from '../productTag/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory','productTags'],
    }); //
  }
  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory','productTags'],
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
    const { productSalesLocation, productCategoryId, productTags, ...product } =
      createProductInput;
    const result = await this.productSaleslocationRepository.save({
      ...productSalesLocation,
    });

    //productTags // ["#전자제품","#영등포","#컴퓨터"]
    const tags = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      //이미 등록된 태드인지 확인해보기
      const prevTag = await this.productTagRepository.findOne({ name: tagname });

      //기존에 태그가 존재한다면
      if (prevTag) {
        tags.push(prevTag);

        //기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagRepository.save({ name: tagname });
        tags.push(newTag);
      }
    }
    
    const result2 = await this.productRepository.save({
      ...product,
      productSaleslocation: result, //데이터 통째로 넣기
      productCategory: { id: productCategoryId }, //데이터id만 넣기 => 데이터 전체를 보고 싶으면 find해서 데이터 넘겨주면 됨=>아니면 바로 위 result 형식으로 써주면 됨
      productTags: tags,
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
