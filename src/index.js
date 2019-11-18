import $ from 'jquery'
import sayHello from './hello';
sayHello('World');
import {getMovies, postMovie, editMovie, deleteMovie} from "./api"


$(document).ready(function () {

  let length;
  
  //! GET MOVIES
const fetch = () => {
  getMovies().then((movies) => {
    length = movies.length
    let bucket = []
    
    movies.forEach(({title, rating, id}) => {
      bucket.push(id)
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
  <a class="btn-floating waves-effect waves-light red"
  id="delete-${id}"><i class="material-icons">clear</i></a>
  
            </div>
            </div>
            </div>`
      $('#card-wrapper').append(html)
    });
    addClickEvent(length, bucket, movies)
    addDeleteEvent(length, bucket)
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
  const addClickEvent = (length, arr, movieArr) => {
    arr.forEach((a,i)=> {
    $(`#${a}`).click(function () {
      movieArr.forEach((m,i)=> {
        console.log(m.id)
        if(Number(m.id) === Number(a)){
          console.log("m.id: ", m.id)
    $('#updateTitle').val(m.title)
    $('#updateSubmit').data('myval', m.id)
        }
      })
    })
    })
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
  
  const addDeleteEvent = (length, arr) => {
    arr.forEach((a,i)=> {
      $(`#delete-${a}`).click(function (e) {
        let id = a
        deleteMovie(id)
            .then(()=> fetch())
            .catch(()=> console.log(`DELETE ERROR`))
      })
    })
  }
  
  
  
  
  
})





