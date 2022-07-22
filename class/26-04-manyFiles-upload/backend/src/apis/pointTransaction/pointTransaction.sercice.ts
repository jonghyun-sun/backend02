import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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

    private readonly conncetion: Connection,
  ) {}
  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.conncetion.createQueryRunner();
    await queryRunner.connect(); //이제 쿼리 러너 사용 가능!

    // transaction 시작!!
    await queryRunner.startTransaction('SERIALIZABLE'); //쿼리 러너를 쓴 것은 다 트랜잭션 걸어주는 것

    try {
      //1. pointTransaction 테이블에 거래기록 생성
      const pointTransaction = await this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransactionRepository.save(pointTransaction); => 쿼리러너 안쓸때 저장하는 법
      await queryRunner.manager.save(pointTransaction);

      //2. 유저의 돈 얼마 있는지 찾아오기
      // const user = await this.userRepository.findOne({ id: currentUser.id });
      const user = await queryRunner.manager.findOne(
        User,
        { id: currentUser.id },
        { lock: { mode: 'pessimistic_write' } }, //비관적 락 걸기
      );

      //3. 유저의 돈 업데이트
      // this.userRepository.update(
      //   { id: user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser); // this.userRepository.save(updatedUser)

      // commit(성공 확정) !!
      await queryRunner.commitTransaction();

      //4. 최종결과 프론트엔트에 돌려주기
      return pointTransaction;
    } catch (error) {
      //중간에 실패하면 rollback 되돌리기!!
      queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release(); //성공하든 실패하는 연결 끊어줘야 한다=> 그렇지 않으먄 db에 연결 쌓임(무한으로 연결할 수 있는 거 x)
    }
  }
}
