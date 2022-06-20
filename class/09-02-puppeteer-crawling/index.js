import  puppeteer  from "puppeteer"

async function startCrawling(){
   const browser = await puppeteer.launch({headless:false})//headless => 눈에 안보이게 켜주는 것(시간이 빨라짐)
   const page = await browser.newPage()//브라우저 창 열기
   await page.setViewport({ width:1280, height:720 })//브라우저 사이즈 정하기
   await page.goto("https://www.goodchoice.kr/product/search/2")//naver.com 열기
   await page.waitForTimeout(1000)//시간 기다렸다가 요청 보내기

   

   const stage = await page.$eval(
       "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
       (el)=>el.textContent
    )//el => 바로 앞에 있는 찾아온 태그를 의미(textcontent => 그 안에 있는 단어 가지고 오기)
    await page.waitForTimeout(1000)//시간 기다렸다가 요청 보내기
   
    const location = await page.$eval(
        "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
        (el)=>el.textContent
    )
    await page.waitForTimeout(1000)//시간 기다렸다가 요청 보내기

    const price = await page.$eval(
        "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
        (el)=>el.textContent
    )
    await page.waitForTimeout(1000)//시간 기다렸다가 요청 보내기
    console.log(stage)
    console.log(location.trim())//trim 하면 양쪽 공백 사라짐 =>js문법
    console.log(price)

    await browser.close()//브라우저 닫기

}

startCrawling()