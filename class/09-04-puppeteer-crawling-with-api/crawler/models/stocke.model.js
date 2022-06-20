import mongoose from "mongoose"

const stockSchema = new mongoose.Schema({
    name:String,
    date:Date,
    price:Number
})//컬럼 생성

export const Stock = mongoose.model("Stock",stockSchema)//Board라는 컬렉션 만들고 그 안의 컴럼은 boardSchema에요

