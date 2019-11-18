import $ from 'jquery'



    //! GET MOVIES
   export const getMovies = () => {
        let cardWrapper = $('#card-wrapper')
        let modalWrapper = $('#modal-wrapper')
        let before = $('#before-loading')
        let after = $('#after-loading')
        cardWrapper.html('')
        modalWrapper.html('')
        before.css('display', 'inline')
        after.css('display', 'none')
        return fetch('/api/movies')
            .then(response => response.json())
            .then(data => {
                before.css('display', 'none')
                after.css('display', 'inline')
                return data
            })
            .catch(()=> console.log(`GET ERROR`))
    }
    
    //! POST MOVIES
   export const postMovie = (obj, num) => {
        const {title, rating} = obj
        if(!title || !rating) return alert(`Title and Rating are required`)
        let newMovie = {
            id: ++num,
           title,
           rating
         }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        }
        return fetch('api/movies', options)
    }
    
    export const editMovie = (obj, id) => {
        const {title, rating} = obj
        if(!title || !rating) return alert(`Title and Rating are required`)
        
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }
        return fetch(`api/movies/${id}`, options)
    }
    
    export const deleteMovie = ( id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(`api/movies/${id}`, options)
    }
    


