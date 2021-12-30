// let database = {
//     "data":[]
// }
function setData(value){
    localStorage.setItem('data', JSON.stringify(value))
}

function getData(){
    return JSON.parse(localStorage.getItem('data'))
}