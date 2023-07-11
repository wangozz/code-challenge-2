//function is called to the render all animals button
function renderPage(){
    //fetches data from json server
    fetch('http://localhost:3000/characters')
    .then((response)=>response.json())
    .then((json)=>post(json))
    }
    
    
    //this function takes thee content from json renders it to the page
    function post(characters){
    
        //iterates over every object in the json server
        characters.forEach((character) =>{
        
        //create an image element for our cute animals
        let content=document.getElementById('content')
        let divContent=document.createElement('div')
        divContent.className="post"
        
    
        let img=document.createElement('img')
        img.src = character.image
        divContent.appendChild(img)
    
        //create a like button
       var btn=document.createElement('button')
       btn.id='likeButton'
       btn.innerHTML = 'Like'
    
       divContent.appendChild(btn)
       btn.addEventListener('click',function (){
        let characterName = character.name
        let individualVote = 0
    
        //Ensures that you can only vote once for each animal
        if(individualVote === 0){
             individualVote++
             character.votes++
             btn.innerHTML = `Liked!: ${character.votes}`
             btn.style.backgroundColor = "red"
             updateData()
        }else if(individualVote> 0){
            individualVote--
            character.votes--
            btn.innerHTML = `like: ${character.votes}`
            btn.style.backgroundColor = "white"
            btn.style.color = "black"
            updateData()
        }
        
        //logs the like count and the updated object array of characters 
        console.log(`${characterName} LikeCount: ${character.votes}`)
        characters.forEach((character)=> console.log(character) ) 
         })
    
         function updateData(){
          fetch(`http://localhost:3000/characters/${character.id}`, {
            method: 'PATCH',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(characters)
          })
          .then(res => res.json())
          .then(character => console.log(character))
    
         }
    
    
        //create the comment section
         let commentSection=document.createElement('div')
         commentSection.className = 'commentSection'
        // Create the form element
        const form = document.createElement('form')
        form.id = `${character.id}'s comment section `
        form.action = ''
        form.method = 'POST'
    
    
    
        // Create the input element
        const input = document.createElement('input')
        input.type = 'text'
        input.id = 'new-comment'
        input.name = 'new-comment'
        input.placeholder = 'Add your comment...'
    
        form.addEventListener('submit', (event)=>{
            event.preventDefault()
            addComment(document.getElementById('new-comment').value)
            form.reset()
          })
    
          //append input to form
        form.appendChild(input)
    
        //append form to  comment section
        commentSection.appendChild(form)
    
        // Create the list container
        const commentContainer = document.createElement('div')
        commentContainer.id = 'comments'
    
        // Create the heading element
        const heading = document.createElement('h2')
        heading.textContent = 'Comments'
    
        // Create the unordered list
        let commentList = document.createElement('ul')
        commentList.id = 'individualComment'
    
        // Append the heading and task list to the list container
        commentContainer.appendChild(heading)
        commentContainer.appendChild(commentList)
    
        // Append the comment container to comment section
        commentSection.appendChild(commentContainer)
    
    
      
    
        //add a comment to the comment section
        function addComment(comment){
            let username=prompt("Enter username: ")
    
    
    
            let item = document.createElement('li')
            item.innerHTML=`${username}: ${comment}  `
          
            let btn = document.createElement('button')
            btn.textContent = 'x'
            btn.addEventListener('click', deletesComment)
          
            item.appendChild(btn)
            commentList.appendChild(item)
          
          }
    
          //deletes a comment from the comment section
          function deletesComment(event){
            event.target.parentNode.remove()
          
          }
    
          //Append the comment section and posts to the page
         content.appendChild(divContent)
         content.appendChild(commentSection)
        })
    
    }
    
    
    
    