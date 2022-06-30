import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  getHello(): string {
    return 'Hello World!';
  }

  findAll() {
    //db에 접속해서 데이터를 꺼내오는 로직
    return [
      {
        number: 1,
        writer: '철수',
        title: '제목',
        contents: '내용',
      },
      {
        number: 2,
        writer: '철수',
        title: '제목',
        contents: '내용',
      },
      {
        number: 3,
        writer: '철수',
        title: '제목',
        contents: '내용',
      },
    ];
  }

  create() {
    //dB에 접속해서 데이터를 등록하는 로직
    return '등록 성공!';
  }
}
