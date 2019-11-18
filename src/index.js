import $ from 'jquery'
import sayHello from './hello';
sayHello('World');
import {getMovies, postMovie, editMovie} from "./api"


$(document).ready(function () {

  let length;
  
  //! GET MOVIES
const fetch = () => {
  getMovies().then((movies) => {
    length = movies.length
    
    movies.forEach(({title, rating, id}) => {
      let html =
          `<div class="card pink lighten-1 white-text">
            <div class="card-body">
            <div class="card-title center">${title}</div>
            <p class="center">
             < ${rating}
             <i class="material-icons">star_border</i>
             Rating >
            </p>

            <div class="card-action center" >
  <a class="waves-effect waves-light btn modal-trigger" href="#modal1" id="${id}">Edit</a>
            </div>
            </div>
            </div>`
      $('#card-wrapper').append(html)
    });
    addClickEvent(length, movies)
  }).catch((error) => {
    alert('Oh no! Something went wrong.Check the console for details.')
    console.log(error);
  });
}

fetch()
  
  //! POST MOVIES
  let submit = $('#submit')
  submit.click(function (e) {
    e.preventDefault()
    let titleValue = $('#title').val()
    let ratingValue = $('#rating').val()
    postMovie({
      title: titleValue,
      rating: ratingValue
    },length)
       .then(()=> fetch())
        .catch(()=> console.log(`POST ERROR`))
    
  })
  
  //! EDIT BUTTONS 
  const addClickEvent = (length, arr) => {
    for (let i = 1; i < length+1; i++) {
      console.log('ld')
      $(`#${i}`).click(function (e) {
        console.log("arr, ", arr)
        arr.forEach((a,i)=> {
           if(Number(e.target.id) === Number(a.id)) {
             console.log("E: ", $('#updateTitle'))
            $('#updateTitle').val(a.title)
             $('#updateSubmit').data('myval', a.id)
           }
        })
      })
    }
  }

  //z: handleUpdate
  let updateButton = $('#updateSubmit')
  updateButton.click(function (e) {
    let id = $('#updateSubmit').data('myval')
    let updatedMove = {
      id,
      title: $('#updateTitle').val(),
      rating: $('#updateRating').val()
    }
    editMovie(updatedMove, id)
        .then(()=> fetch())
        .catch(()=> console.log(`EDIT ERROR`))
    instance.close()
  })
  
  
  //! DELETE
  
  
  
  
  
  
  
})



