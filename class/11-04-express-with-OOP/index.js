import express from 'express'
import{CacheService} from './cache.js'
import{ProductService} from './product.js'

const app = express()

//상품 구매하기
app.post("/products/buy",(req,res)=>{
    //1. 가진돈 검증하는 코드(10줄 => 2줄)
    const cacheService = new CacheService()
    const hasMoney = cacheService.checkValue()//true 또는 false 리턴

    //2.판매 여부 검증하는 코드(10줄 => 2줄)
    const productService = new ProductService()
    const isSoldout = productService.checkSoldOut()//true 또는 false 리턴


    //3. 상품 구매하는 코드
    if(hasMoney && !isSoldout){
        res.send("상품 구매 완료!!")
    }
   
})

//상품 환불하기
app.post("/products/refunc",(req,res)=>{
    ///1.판매 여부 검증하는 코드(10줄 => 2줄)
    const productService = new ProductService()
    const isSoldout = productService.checkSoldOut()//true 또는 false 리턴

    //2.상품 환불하는 코드
    if(isSoldout){
        res.send("상품 환불 완료!!")
    }
   
})

app.listen(3000)