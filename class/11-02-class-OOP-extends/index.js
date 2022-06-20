class SkyUnit{

    constructor(){
        
    }
    run =()=>{
        console.log("날라서 도망")
    }
}

class GroundUnit{
    run =()=>{
        console.log("뛰어서 도망")
    }
}

class Monster extends SkyUnit{
    power = 10

    constructor(aaa){
        super(300)
    }

    attack = () => {
        console.log("공격하자!!")
        console.log("내 공격력은 "+ this.power)
    }
}
const mymonster1 = new Monster()
mymonster1.attack()
mymonster1.run()