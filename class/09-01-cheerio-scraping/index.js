import axios from "axios"
import  cheerio  from "cheerio"


async function getOpenGraph(mydata){

    //3.게시글에서 URL찾아서 스크래핑하기
    const targetUrl = mydata.contents.split(" ").filter((el)=>el.startsWith("http"))[0]

    //1. 스크래핑하기
    const aaa = await axios.get("https://naver.com")//html 받아오기

    //2.OG골라내기
    const $ = cheerio.load(aaa.data)//받아온 정보 cheerio로 넘겨줘서 '찾기'//cheerio에서는 $를 쓴다(관용적 표현)
    $("meta").each((_,el)=>{//each는 cheerio 만든 사람들이 만든거임 (몇번째 태그인지,그때 그 태그 가지고 오기)
        if($(el).attr('property')){//og 태그가 존재하는 것만 실행(property 있는게 og태그 밖에 없음)
            const key = $(el).attr('property').split(":")[1]// 값이 el인 테그 중에서 속성이 property인거 찾아줘
            const value = $(el).attr('content')//갑이 el 태그 중에서 속성이 content인거 찾아줘
            console.log(key,value)
        }
    }) //메타 태그 찾아서 각각 실행해줘
}

const frontendData = {//그냥 예시(미리보기 띄어주기)
    title:"안녕하세요",
    contents:"여기 정말 좋은 거 같아요!!여기는 https://naver.com"
}

getOpenGraph(frontendData)