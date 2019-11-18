import $ from 'jquery'
import sayHello from './hello';
sayHello('World');
import {getMovies, postMovie, editMovie, deleteMovie} from "./api"
import {getSearch} from "./db"


$(document).ready(function () {

  let length;
  let searchList = []
  
  //! GET MOVIES
const fetch = () => {
  getMovies().then((movies) => {
    length = movies.length
    let bucket = []
    
    movies.forEach(({title, rating, id}) => {
      bucket.push(id)
      let html =
          `<div class="card pink lighten-4 white-text movie"
            style="margin: auto">
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
  
  //! DATA BASE STUFF
  let searchButton = $('#dbSubmit')
  searchButton.click(function (e) {
    console.log(`click`)
    let searchTerm = $('#dbInput').val()
    getSearch(searchTerm)
        .then((movies)=> {
          console.log(`MOVIES: `, movies)
          let wrapper = $('#db-card-wrapper')
          wrapper.html('')
            let idBucket = []
          //!loop terms
          movies[0].known_for.forEach((m,i)=> {
            searchList.push(m)
            idBucket.push(m.id)
            console.log("m: ", m)
            let html =
                `<div class="card search-card" >
                    <div class="card-body">
                    <div class="card-title">${m.title}
                      <a class="waves-effect waves-light btn modal-trigger btn-small" href="#modal2" id="db-${m.id}"><i class="material-icons "
                    data-target="modal2">playlist_add</i></a>
                    </div>
                    ${m.overview}
                    <div class="card-action">
                    ${m.release_date}
                </div>
                </div>
                </div>`
            wrapper.append(html)
          })
          addAddEvent(idBucket)
        })
        .catch(()=> console.log('GET DB ERROR'))
  })
  
  const addAddEvent = arr => {
    console.log("search List: ", searchList)
    arr.forEach((a,i)=> {
      $(`#db-${a}`).click(function (e) {
        searchList.forEach((s,i)=> {
          console.log("S: ", s.title)
          if(Number(s.id) === Number(a)){
            $('#inputDB').val(s.title)
            // $('submitDB').set('myval2', s.id)
          }
        })
      })
    })
  }
  
  $('#submitDB').click(function () {
    let movie = {
      title: $('#inputDB').val(),
      rating: $('#selectDB').val()
    }
    postMovie(movie)
        .then(()=> fetch())
        .catch(()=> console.log(`DB POST CATCH`))
  })
  
})





