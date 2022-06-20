//타입 추론
let aaa = "안녕하세요";
aaa = 3;

//타입 명시
let bbb: string = "반갑습니다";
bbb = 10;

//문자 타입
let ccc: string;
ccc = "반가워요";
ccc = 3;

//숫자 타입
let ddd: number;
ddd = "asdsa";

//불린 타입
let eee: boolean;
eee = true;

//배열 타입
let fff: number[] = [1, 2, "안녕하세요"];
let ggg: string[] = ["철수", 13];
let hhh: (number | string)[] = ["철수", 13]; //숫자나 문자 아무거나 와도 상관 x

//객체 타입
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string; //하비가 있을 수도 있고 나중에 추가 될 수도 있어
}

let profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};

profile.age = "8살";
profile.hobby = "수영";

//함수 타입
const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
};

add(1000, 2000, "원");
