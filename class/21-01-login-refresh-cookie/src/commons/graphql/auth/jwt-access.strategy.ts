import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable() //주입 받아야 쓸 수 있음
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  ///aaa라는 이름의 가드를 통해 passport-jwt(Strategy)를 사용해서 인가(로그인 검증)를 처리할거야
  constructor() {
    //검증부
    super({
      //슈퍼는 상속 받은 것의 constructor 사용할때 쓰는 것
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //  토큰만 뽑아오는 함수 내장 되어있다
      secretOrKey: 'myAccessKey',
    });
  }

  validate(payload) {
    //검증 완료되면 실행
    console.log(payload);
    return {
      //리턴하면 context안으로 들어감
      id: payload.sub,
      email: payload.email,
    };
  }
}
