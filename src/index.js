document.addEventListener("DOMContentLoaded", e => {
const animalUrl = "http://localhost:3000/animals/1"
const commentsUrl = "http://localhost:3000/comments/" //use for POST


const getAnimals = () => {
    fetch(animalUrl)
    .then(response => response.json())
    .then(animals => renderAnimal(animals))
    
  }
  
  const renderAnimal = (animals) => {

    const photo = document.querySelector(".image")
    photo.src = animals.image_url
}
//   function renderImage(animal) {
//     const name = document.querySelector(".title")
//     name.innerText = `${animal.name}`
//     const photo = document.querySelector(".image")
    
//     photo.src = `${animal.image_url}`
//     const commentsUl = document.querySelector("ul")

    // console.log(animal);
    // console.log(animal.forEach(animal => animal.quote));
    // animal.comments.forEach(comment=> console.log(comment))
    // animal.comment.forEach(comment => renderComment(comment, commentUl))
//   }
  
//   function renderComment(comment, commentUl) {
//     // console.log(commentsUl);
//     const commentLi = document.createElement("li")
//     commentLi.innerText = `${animal.comment}`
//     commentUl.append(commentLi)
//   }
  
//   function getImages(){
//     fetch(baseUrl)
//     .then(response => response.json())
//     .then(image => renderImage(image))
//   }

  getAnimals()

})