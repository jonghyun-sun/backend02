import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ impUid, amount, currentUser }) {
    //1. pointTransaction 테이블에 거래기록 생성
    const pointTransaction = await this.pointTransactionRepository.save({
      impUid: impUid,
      amount: amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    //2. 유저의 돈 얼마 있는지 찾아오기
    const user = await this.userRepository.findOne({ id: currentUser.id });

    //3. 유저의 돈 업데이트
    this.userRepository.update({ id: user.id }, { point: user.point + amount });

    //4. 최종결과 프론트엔트에 돌려주기
    return pointTransaction;
  }
}
