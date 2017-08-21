export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories
  }
}

export function fetchCategories() {
  return function (dispatch) {
    return fetch('http://localhost:5001/categories', { headers: { 'Authorization': 'hello' }})
    .then(
      response => response.json(),
      error => console.log('An error occured.', error)
    )
    .then(json => dispatch(receiveCategories(json)))
  }
}