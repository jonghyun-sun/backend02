class SkyUnit {
  constructor(qqq) {}
  run = () => {
    console.log("날라서 도망");
  };
}

class GroundUnit {
  run = () => {
    console.log("뛰어서 도망");
  };
}

class Monster extends SkyUnit {
  power = 10;

  constructor(aaa) {
    super(300); //이 300이라는 숫자는 skyunit의 constructor의 인자롤 들어감 => 상속받을 class의 constructor쓰고 싶을때 쓰는 것임
  }

  attack = () => {
    console.log("공격하자!!");
    console.log("내 공격력은 " + this.power);
  };
}
const mymonster1 = new Monster();
mymonster1.attack();
mymonster1.run();
