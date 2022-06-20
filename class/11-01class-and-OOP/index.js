const aaa = new Date()
console.log(aaa.getFullYear())
console.log(aaa.getMonth()+1)





class Monster{

    power = 10
    
    constructor(aaa){
        this.power = aaa
    }
    
    attack = () => {
        console.log("공격하자!!")
        console.log("내 공격력은 "+ this.power)
    }

    myrun = ()=>{
        console.log("도망가자")
    }
}

const mymonster1 = new Monster()

mymonster1.attack()
mymonster1.myrun()

const mymonster2 = new Monster(50)
mymonster2.attack()
mymonster2.myrun()