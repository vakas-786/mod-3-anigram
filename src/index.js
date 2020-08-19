document.addEventListener("DOMContentLoaded", e => {
const animalUrl = "http://localhost:3000/animals/7040"    //"http://localhost:3000/animals/7040" and change user_id to 6 on ln 87
const commentsUrl = "http://localhost:3000/comments/" //use for POST
const usersUrl = "http://localhost:3000/users/"
// localStorage["user"] = 
//make a user json table 

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
        const commentsLi = document.createElement('li')
        commentsLi.innerText = commentObj.text
        commentsLi.dataset.commentId = commentObj.id
        const deleteBtn = document.createElement("button")
        deleteBtn.className = ("deleteBtn")
        deleteBtn.textContent = "X"
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
    }else if(event.target.textContent === "X") {
        
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
        
      }
    })
  
  
    document.addEventListener('submit', (event) => {
      event.preventDefault()
        const form = event.target
        const animalUl = document.querySelector('.comments')
        const animalId = animalUl.dataset.animalId
        const userId = form.dataset.userId
      
        comment = `User: ${form.comment.value}`

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
      .then(commentObj => {
        // console.log(data)
        const commentUl = document.querySelector('.comments')
        const commentLi = document.createElement('li')
        commentLi.innerHTML = comment
        commentLi.dataset.commentId = commentObj.id
        // console.log(comment)
        commentUl.append(commentLi)

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "X"
        commentLi.append(deleteBtn)
        commentForm = document.querySelector(".comment-input")
        commentForm.value = ""
    })
   
  })


// const deleteComment = () => {
//   document.addEventListener('click', (event) => {
//     event.preventDefault()
//     if (event.target.textContent === "X") {
    
//     const textLi = event.target.parentElement
//     textLi.remove()
//     const commentId = textLi.dataset.commentId

//     const options = {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       // body: JSON.stringify(jsObject)
//     }

//     fetch(commentsUrl + commentId, options)
//     .then(response => response.json())

//     }
//   })
// }


  getAnimals()
  // deleteComment()

})