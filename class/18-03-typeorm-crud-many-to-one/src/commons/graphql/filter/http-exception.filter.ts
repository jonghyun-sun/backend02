import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException) //데코레이터를 통해 nestjs에 등록 => 에러가 발생하면 catch함수를 실행
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    //이렇게 하면 trycatch쓸때 catch 부분을 길게 쓸 필요x => 다 여기다 쓰면 됨
    const status = exception.getStatus();
    const message = exception.message;

    console.log('===============');
    console.log('에러가 발생했어요');
    console.log('에러 내용:', message);
    console.log('에러 코드:', status);
    console.log('===============');
  }
}
