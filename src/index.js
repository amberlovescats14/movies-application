import $ from 'jquery'
import sayHello from './hello';
sayHello('World');
import {getMovies, postMovie} from "./api"


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
            <div class="card-title">${title}</div>
            ${rating}
            </div>
            </div>`
      $('#card-wrapper').append(html)
    });
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
    let id = 2
    let titleValue = $('#title').val()
    let ratingValue = $('#rating').val()
    postMovie({
      title: titleValue,
      rating: ratingValue
    },length)
       .then(()=> fetch())
        .catch(()=> console.log(`POST ERROR`))
    
  })
  
})



