import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  setRefreshToken({ user, res }) {
    const resfreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //id라고 써도 되는데 그냥 독스따라 sub라고 쓴거임//토큰은 누구나 볼수 있기에 많은 내용 넣지 말자
      { secret: 'myRefreshKey', expiresIn: '2w' }, //비밀번호 적는 곳
    );
    //개발환경
    res.setHeader('Set-Cookie', `refreshToke=${resfreshToken}`); //쿠키에 리프레시토큰을 저장하겠다

    // 배포환경=> 보안 강화를 위해 이렇게 써줘야 한다
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
    // )
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //id라고 써도 되는데 그냥 독스따라 sub라고 쓴거임//토큰은 누구나 볼수 있기에 많은 내용 넣지 말자
      { secret: 'myAccessKey', expiresIn: '1h' }, //비밀번호 적는 곳
    );
  }
}
