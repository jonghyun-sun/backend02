import axios from 'axios'

//비동기 방식
function fetchPost(){
    const result = axios.get('https://koreanjson.com/posts/1')
    console.log(result)//promise{<pending>}
}

fetchPost()

//동기 방식
async function fetchPost2(){
    const result = await axios.get('https://koreanjson.com/posts/1')
    console.log(result.data.title)//실제 데이터
}

fetchPost2()