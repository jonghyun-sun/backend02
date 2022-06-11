const apple = 3
const banana = 2


console.log("철수는 사괴를 " + apple + "개, " + "바나나를 "+ banana+ "개 가지고 있습니다")
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다`) // template literal

function getWelcomeTemplate(user){

    return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createAt}</div>
            </body>
        </html>   
    `
}

const myuser = {
    myname: "철수",
    myage: 13,
    myschool: "다람쥐 초등학교",
    mycreateAt: "2020-01-02",
}
const result = getWelcomeTemplate(myuser)
console.log(result)

