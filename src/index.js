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
            <div class="card-title">${title}, ${rating} Star Rating</div>
            <div class="card-action" ">
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
             let modalDiv = $('#modal1').html('')
             //! MODAL FORM
             let modalForm =
                 `
                     <div class="row">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <input id="title" type="text" class="validate"
                    value="${a.title}" required>
                </div>
                <div class="input-field col s12">
                        <select name="rating" id="rating" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    <label>Rating</label>
                </div>
                <button class="btn waves-effect waves-light" id="editSumbit">Update</button>
            </div>
        </form>
    </div>
                 `
             //! END MODAL FORM
             $('#modal1').append(modalForm)
             console.log(`the oonoe: `, a)
             // here
           }
        })
      })
    }
  }

  
})



