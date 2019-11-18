import $ from 'jquery'
import {DB_KEY} from "./keys"

export const getSearch = (term) => {
    if(!term) return alert(`Search term cannot be blank.`)
    let url = `https://api.themoviedb.org/3/search/person?api_key=${DB_KEY}&query=${term}`
    console.log("url", url)
    return fetch(url)
        .then(res => res.json())
        .then(data => data.results)
        .catch(e => console.log(`DB GET ERROR`))
}