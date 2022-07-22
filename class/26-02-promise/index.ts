// new Promise((resolve, reject) => { promise이기 때문에 await로 기다리는게 가능해진다
// 뭔가 특정 작업(API 보내기 등)
// if(성공!!){ 성공하면 resolve 실행
//     resolve("철수")
// }
// if(실패!!){ 실패하면 reject실행
// reject("에러에요!!!")
// }
// }).then(res =>{}).catch(err =>{}) .then으로 결과(resolve)를, .catch로 Error(reject) 를 받을 수 있다

const fetchData = async () => {
  const result = await new Promise((resolve, reject) => {
    // 뭔가 특정 작업(API 보내기 등)
    setTimeout(() => {
      // 외부에 데이터 보내고 받는데 2초 걸림
      try {
        resolve("성공시 받는 데이터");
      } catch (error) {
        reject("실패했습니다!!!");
      }
    }, 2000);
  });
  //   console.log(result);
};

fetchData();
