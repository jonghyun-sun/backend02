function zzz(aaaaa) {
  console.log("=========");
  console.log(aaaaa);
  console.log("==========");
}

@zzz
class AppController {}

class Aaa {
  constructor(public mypower) {
    this.mypower = mypower;
  }

  ggg() {
    console.log("안녕하세요");
  }
}
const aaa = new Aaa(50);
aaa.mypower = 5;

class Bbb {
  constructor(private mypower) {
    this.mypower;
  }
  ggg() {
    console.log("안녕하세요");
  }
}

const bbb = new Bbb(50);
// bbb. => 밖에서 접근 불가

class Ccc {
  constructor(readonly mypower) {
    this.mypower;
  }
  ggg() {
    // this.mypower = 10 => 안에서도 읽기만 가능
    console.log("안녕하세요");
  }
}
