
function renderPage(){
fetch('http://localhost:3000/characters')
.then((response)=>response.json())
.then((json)=>post(json))
}

function post(characters){

    characters.forEach((character) =>{
    let content=document.getElementById('content')

    let divContent=document.createElement('div')
    divContent.className="post"

    let img=document.createElement('img')
    img.src = character.image
    divContent.appendChild(img)

   var btn=document.createElement('button')
   btn.id='likeButton'
   btn.innerHTML = 'Like'

   divContent.appendChild(btn)
   btn.addEventListener('click',function (){
    let characterName = character.name
    let votes = character.votes

    if(character.votes === 0){
         votes++
         btn.innerHTML = 'Liked!'
         character.votes++
         btn.style.backgroundColor = "red"
    }else if(character.votes > 0){
        votes--
        btn.innerHTML = 'like'
        character.votes--
        btn.style.backgroundColor = "white"
        btn.style.color = "black"


    } 
    console.log(`${characterName} LikeCount: ${votes}`)
    characters.forEach((character)=> console.log(character) ) 
     })

     content.appendChild(divContent)
    })

}
