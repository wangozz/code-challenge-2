
function renderPage(){
fetch('http://localhost:3000/characters')
.then((response)=>response.json())
.then((json)=>post(json))
}