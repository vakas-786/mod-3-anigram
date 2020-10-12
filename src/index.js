document.addEventListener("DOMContentLoaded", e => {
const animalUrl = "https://serene-caverns-61931.herokuapp.com/animals/"    
const commentsUrl = "https://serene-caverns-61931.herokuapp.com/comments/" 
const usersUrl = "https://serene-caverns-61931.herokuapp.com/users/"
const firstUrl = "https://serene-caverns-61931.herokuapp.com/first" 

const getAnimals = () => {
    fetch(firstUrl)
    .then(response => response.json())
    .then(animals => renderAnimal(animals))
  }
  
  
    const renderAnimal = (animals) => {
      const commentsUl = document.querySelector('.comments')
      commentsUl.dataset.animalId = animals.id
      const photo = document.querySelector(".image")
      const quoteBox = document.querySelector(".speech")
      const personality = document.querySelector(".personality")
      personality.innerHTML = `<h3 class="personality">Mood: ${animals.personality}</h3>`
      quoteBox.innerText = animals.quote
      const iconImg = document.createElement('img')
      iconImg.src = animals.icon_url
      iconImg.width = 70
      iconImg.height = 70
      quoteBox.append(iconImg)
      photo.src = animals.image_url

      const animalName = document.querySelector(".title")
      animalName.innerHTML = `<h2 class="title">${animals.name} the ${animals.species}</h2>`
      
      
      const commentArray = animals.comments
      
      commentArray.forEach(commentObj => {
        
        const form = document.querySelector('.comment-form')
        form.dataset.userId = commentObj.user_id
        const ul = document.querySelector('.comments')
        const commentsLi = document.createElement('li')
        commentsLi.innerText = commentObj.text
        commentsLi.dataset.commentId = commentObj.id
        const deleteBtn = document.createElement("button")
        deleteBtn.className = ("deleteBtn")
        deleteBtn.textContent = "🗑"
        commentsLi.append(deleteBtn)
        
        
        ul.appendChild(commentsLi)
      })
  }

  document.addEventListener('click', (event) => {
    if(event.target.textContent === "🔔") {
      const likes = event.target.previousElementSibling
      let likesNumber = parseInt(likes.innerText.split(" ")[0])
      let counter =parseInt(likesNumber) +1
      likes.innerText = `${counter} bells`
    }else if(event.target.textContent === "🗑") {
        
        const textLi = event.target.parentElement
        textLi.remove()
        const commentId = textLi.dataset.commentId
        
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
        
        fetch(commentsUrl + commentId, options)
        .then(response => response.json())
      }else if(event.target.textContent === "Meet a Villager") {
        fetch(animalUrl)
        .then(response => response.json())
        .then(animals => renderAnimal(animals))

        const renderAnimal = (animals) => {
          const quoteBox = document.querySelector(".speech")
          quoteBox.innerText = animals.quote
          const iconImg = document.createElement('img')
          iconImg.src = animals.icon_url
          iconImg.width = 70
          iconImg.height = 70
          const personality = document.querySelector(".personality")
          personality.innerHTML = `<h3 class="personality">Mood: ${animals.personality}</h3>`
          const pTag = document.querySelector("p")
          pTag.append(iconImg)
 
          const commentsUl = document.querySelector('.comments')
          commentsUl.dataset.animalId = animals.id
          const photo = document.querySelector(".image")
          photo.src = animals.image_url
          const animalName = document.querySelector(".title")
          animalName.innerHTML = `<h2 class="title">${animals.name} the ${animals.species}</h2>`
          likesNum = document.querySelector(".likes")
          const firstNum =parseInt(likesNum.innerText.split(" ")[0])
          likesNum.innerText = `${firstNum*0} bells`
          const commentArray = animals.comments
          commentsUl.innerHTML = ""
          
          commentArray.forEach(commentObj => {
            const form = document.querySelector('.comment-form')
            form.dataset.userId = commentObj.user_id
            const ul = document.querySelector('.comments')
            const commentsLi = document.createElement('li')
            commentsLi.innerText = commentObj.text
            commentsLi.dataset.commentId = commentObj.id
            const deleteBtn = document.createElement("button")
            deleteBtn.className = ("deleteBtn")
            deleteBtn.textContent = "🗑"
            commentsLi.append(deleteBtn)
            
            ul.appendChild(commentsLi)
          })
      }
      }
    })
  
  
    document.addEventListener('submit', (event) => {
      event.preventDefault()


      const form = event.target
      const animalUl = document.querySelector('.comments')
      const animalId = animalUl.dataset.animalId
      fetch(usersUrl)
      .then(response => response.json())
      .then(user => {
        let userId = user.map(user => user.id)
        comment = form.comment.value 
        const options = {
          
          
          method: 'POST',
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify( {user_id: userId[0], animal_id: animalId, text: comment} )
        }
        fetch(commentsUrl, options)
        .then(response => response.json())
        .then(commentObj => {
          
          if(comment === "") {
            alert("NO EMPTY COMMENTS IN MY VILLAGE!")
          }else {
            const commentUl = document.querySelector('.comments')
            const commentLi = document.createElement('li')
            
            commentLi.innerHTML = comment
            commentLi.dataset.commentId = commentObj.id
            commentUl.append(commentLi)
            
            const deleteBtn = document.createElement("button")
            deleteBtn.textContent = "🗑"
            commentLi.append(deleteBtn)
            commentForm = document.querySelector(".comment-input")
            commentForm.value = ""
          }
        })
        })
        
      })
      

  getAnimals()

})