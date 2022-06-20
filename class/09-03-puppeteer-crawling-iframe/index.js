import  puppeteer  from "puppeteer"

async function startCrawling(){
   const browser = await puppeteer.launch({headless:false})//headless => 눈에 안보이게 켜주는 것(시간이 빨라짐)
   const page = await browser.newPage()//브라우저 창 열기
   await page.setViewport({ width:1280, height:720 })//브라우저 사이즈 정하기
   await page.goto("https://finance.naver.com/item/sise.naver?code=005930")//naver.com 열기
   await page.waitForTimeout(1000)//시간 기다렸다가 요청 보내기
   const framePage = await page.frames().find(el =>el.url().includes("/item/sise_day.naver?code=005930"))//뒤에 주소를 포함한 iframe만 찾아 온다
   //iframe은 다른 페이지라고 생각해야한다

    
   for(let i = 3; i < 7; i++){
        const date = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
            el => el.textContent
        )    
         const price = await framePage.$eval(
            `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
            el => el.textContent
        )
        console.log(`날짜:${date},가격:${price}`)
   }
   
  
    
   

    await browser.close()//브라우저 닫기

}

startCrawling()