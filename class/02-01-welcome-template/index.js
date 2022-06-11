const apple = 3
const banana = 2


console.log("철수는 사괴를 " + apple + "개, " + "바나나를 "+ banana+ "개 가지고 있습니다")
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다`) // template literal

function getWelcomeTemplate(name,age,school,createAt){

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

const myname = "철수"
const myage = 13
const myschool = "다람쥐 초등학교"
const mycreateAt = "2020-01-02" 
const result = getWelcomeTemplate(myname,myage,myschool,mycreateAt)
console.log(result)

