import mongoose from "mongoose"

const boardSchema = new mongoose.Schema({
    writer:String,
    title:String,
    contents:String
})//컬럼 생성

export const Board = mongoose.model("Board",boardSchema)//Board라는 컬렉션 만들고 그 안의 컴럼은 boardSchema에요

