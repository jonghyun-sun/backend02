import express from 'express'
import { CouponController } from './mvc/controllers/coupon.controller.js'
import { ProductController } from './mvc/controllers/product.controller.js'
import { CacheService } from './mvc/controllers/services/cache.service.js'
import { PointService } from './mvc/controllers/services/point.service.js'
import { ProductService } from './mvc/controllers/services/product.service.js'

const app = express()

const productService = new ProductService
const cacheService = new CacheService//new 한번으로 모든곳에서 재사용 가능(싱글톤패턴)
const pointService = new PointService

//상품 API
const productController = new ProductController(cacheService,productService)
app.post("/products/buy", productController.buyProduct)//상품 구매하기
app.post("/products/refunc", productController.refundProduct)//상품 환불하기

//쿠폰(상품권)API
const couponController = new CouponController(cacheService)
app.post("/coupons/buy",couponController.buyCoupon)

app.listen(3000)