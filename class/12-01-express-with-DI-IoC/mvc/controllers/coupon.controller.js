import { CacheService } from "./services/cache.service"

export class CouponController{
    constructor(moneyService){
        this.moneyService = moneyService
    }
    buyCoupon = (req,res)=>{
        //1. 가진돈 검증하는 코드(10줄 => 2줄)
        const hasMoney = this.moneyService.checkValue()//true 또는 false 리턴
   
        //2.쿠폰을 구매하는 코드
        if(hasMoney){
            res.send("쿠폰 구매 완료!")
        }
   }
}