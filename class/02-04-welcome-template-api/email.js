import {getToday}from "./utils.js"

export function checkValidationEmail(email){
    if(email === undefined || !email.includes("@")){
        console.log("에러발생!! 이메일을 제대로 입력해 주세요!!!")
        return false
    }else{
        return true
    }
}

export function getWelcomeTemplate(user){

    return `
        <html>
            <body>
                <h1>${user.name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${user.name}</div>
                <div>나이: ${user.age}살</div>
                <div>학교: ${user.school}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>   
    `
}
export function sendTemplateToEmail(email,mytemplate){
    console.log(email + "이메일로" + mytemplate + "를 전송합니다")
}