//module 방식
import {checkValidationPhone,getToken,sendTokenToSMS}from './phone.js'

// commjs방식
// const {checkValidationPhone} = require('./phone.js')

function createTokenOfPhone(myphone){

    //1.휴대폰번호 자릿수 맞는지 확인하기
    const isValid = checkValidationPhone(myphone)
    if(isValid){
        //2.핸드폰 토큰 6자리 만들기
        const token = getToken()

        //3.핸드폰 번호에 토큰 전송하기
        sendTokenToSMS(myphone,token)
    }
}

createTokenOfPhone("01012345678")


