import { ApolloServer, gql } from'apollo-server' ;
import {checkValidationPhone,getToken,sendTokenToSMS}from './phone.js'


// The GraphQL schema
const myTypeDefs = gql`

    input CreateBoardInput{#프론트에서 받는 타입이라 input이라고 앞에 써야함!!
      wirter:String
      title:String
      contents:String
    }

    type BoardReturn{
        number:Int
        wirter:String
        title:String
        contents:String
    }


    type Query {
        # fetchBoards:BoardReturn =>객체 1개를 의미
        fetchBoards:[BoardReturn] #=> 배열안에 객체 한개를 의미
    }

    type Mutation{
        createBoard(wirter:String,title:String,contents:String):String
        createBoard2(createBoardInput:CreateBoardInput):String
        createTokenOfPhone(myphone:String):String
    } 
    
`;

// A map of functions which return data for the schema.
const myResolvers = {
  Query: {
    fetchBoards: ()=>{
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
        return result
    }
  },
  Mutation:{
    createBoard:(_,args)=>{
        //1,데이터를 등록하는 로직 => db에 접속해서 데이터 저장하기
        console.log(args)

        //2.저장 결과 알려주기
        return "등록에 성공하였습니다"

    },
    createBoard2:(_,args)=>{
      //1,데이터를 등록하는 로직 => db에 접속해서 데이터 저장하기
      console.log(args)

      //2.저장 결과 알려주기
      return "등록에 성공하였습니다"

    },
    createTokenOfPhone:(_,args)=>{
      //1.휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkValidationPhone(args.myphone)
      if(isValid){
          //2.핸드폰 토큰 6자리 만들기
          const token = getToken()

          //3.핸드폰 번호에 토큰 전송하기
          sendTokenToSMS(args.myphone,token)
          return "인증 완료"
      }
      return "인증 실패"
    }
  }
};

const server = new ApolloServer({
  typeDefs:myTypeDefs,
  resolvers:myResolvers,
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});//어디서 서버가 켜졌고 몇번 포트로 켜졌는지