import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}
  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //id라고 써도 되는데 그냥 독스따라 sub라고 쓴거임//토큰은 누구나 볼수 있기에 많은 내용 넣지 말자
      { secret: 'myAccessKey', expiresIn: '1h' }, //비밀번호 적는 곳
    );
  }
}
