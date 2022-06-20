import { CacheService } from "./services/cache.service"
import { ProductService } from "./services/product.service"

export class ProductController{

    constructor(moneyService,productService){
        this.moneyService = moneyService//moneyservice란 변수에 moneyservice 넣어줘
        this.productService = productService
    }


    buyProduct = (req,res) =>{
        //1. 가진돈 검증하는 코드(10줄 => 2줄)
        const hasMoney = this.moneyService.checkValue()//true 또는 false 리턴
        //constructor 안에 있는 것을 쓰고 싶으면 앞에 this붙이면 된다
        
        //2.판매 여부 검증하는 코드(10줄 => 2줄)
        const isSoldout = this.productService.checkSoldOut()//true 또는 false 리턴


        //3. 상품 구매하는 코드
        if(hasMoney && !isSoldout){
            res.send("상품 구매 완료!!")
        }
    }
    refundProduct = (req,res)=>{
        ///1.판매 여부 검증하는 코드(10줄 => 2줄)
        const isSoldout = this.productService.checkSoldOut()//true 또는 false 리턴
    
        //2.상품 환불하는 코드
        if(isSoldout){
            res.send("상품 환불 완료!!")
        }
       
    }
}