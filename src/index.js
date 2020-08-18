document.addEventListener("DOMContentLoaded", e => {
const animalUrl = "http://localhost:3000/animals/7040"
const commentsUrl = "http://localhost:3000/comments/" //use for POST


const getAnimals = () => {
    fetch(animalUrl)
    .then(response => response.json())
    .then(animals => renderAnimal(animals))
    
  }
  
    const renderAnimal = (animals) => {
      const commentsUl = document.querySelector('.comments')
      commentsUl.dataset.animalId = animals.id
      const photo = document.querySelector(".image")
      photo.src = animals.image_url
      const animalName = document.querySelector(".title")
      animalName.innerHTML = `<h2 class="title">${animals.name} the ${animals.species}</h2>`

      // console.log(animals.comments)
      const commentArray = animals.comments
      
      commentArray.forEach(commentObj => {
        
        // console.log(commentObj)
        const form = document.querySelector('.comment-form')
        form.dataset.userId = commentObj.user_id
        // console.log(form)
        const ul = document.querySelector('.comments')
        commentsLi = document.createElement('li')
        commentsLi.innerText = commentObj.text
        
        ul.appendChild(commentsLi)
      })
  }

  document.addEventListener('click', (event) => {
    if(event.target.textContent === "🔔") {
      const likes = event.target.previousElementSibling
      let likesNumber = parseInt(likes.innerText.split(" ")[0])
      //console.log(likes.innerText.split(" ")[0])
      let counter =parseInt(likesNumber) +1
      likes.innerText = `${counter} bells`
    }
  })
  const submitComment = () => {
    document.addEventListener('submit', (event) => {
      event.preventDefault()
      const form = event.target
      const animalUl = document.querySelector('.comments')
      const animalId = animalUl.dataset.animalId
      const userId = form.dataset.userId
      // console.log(userId)
    
      comment = form.comment.value 

      const options = {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify( {user_id: 6, animal_id: animalId, text: comment})
      }
      fetch("http://localhost:3000/comments/", options)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        const commentUl = document.querySelector('.comments')
        const commentLi = document.createElement('li')
        commentLi.innerText = comment 
        commentUl.append(commentLi)
      })
    })
  } 


  getAnimals()
  submitComment()

})