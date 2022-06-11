import {checkValidationPhone,getToken,sendTokenToSMS}from './phone.js'
import express from 'express'

const app = express()
const port = 3000

app.use(express.json())

app.get('/boards', (req, res) => {
  //데이터를 조회하는 로직 => db에 접속해서 데이터 꺼내오기
  const result = [
    {
      number:1,
      wirter:"철수",
      title:"제목입니다",
      contents:"내용입니다"
    },
    {
      number:2,
      wirter:"영희",
      title:"영희제목입니다",
      contents:"영희내용입니다"
    },
    {
      number:3,
      wirter:"훈이",
      title:"훈이제목입니다",
      contents:"훈이내용입니다"
    }

  ]
  //꺼내온 결과 응답 주기
  res.send(result)
})

app.post('/boards', (req, res) => {
  //1,데이터를 등록하는 로직 => db에 접속해서 데이터 저장하기
  //프론트엔드로부터 데이터 받아오기
  //콘솔로 찍어서 확인해보기

  //2.저장 결과 알려주기
  res.send('등록에 성공하였습니다')
  console.log(req.body)
})

app.post('/tokens/phone',(req,res)=>{
  //1.휴대폰번호 자릿수 맞는지 확인하기
  const myphone = req.body.phone
  const isValid = checkValidationPhone(myphone)
  if(isValid){
      //2.핸드폰 토큰 6자리 만들기
      const token = getToken()

      //3.핸드폰 번호에 토큰 전송하기
      sendTokenToSMS(myphone,token)
      res.send("인증완료!!!")
  }
})
// app.get('/board/:id', (req, res) => {
//   res.send('Hello World!')
// }) 

// app.put('/boards/:id', (req, res) => {
//   res.send('Hello World!')
// })

// app.delete('/boards/:id', (req, res) => {
//   res.send('Hello World!')
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})