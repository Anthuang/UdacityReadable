export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_POST = 'UPDATE_POST';

function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
    category
  }
}

export function fetchPosts(category = null) {
  return function (dispatch) {
    return fetch('http://localhost:5001' + (category ? '/' + category : '') + '/posts', { headers: { 'Authorization': 'hello' }})
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(json => dispatch(receivePosts(category, json)))
  }
}

function requestPost() {
  return {
    type: REQUEST_POST,
    status: 'Loading'
  }
}

function receivePost(json) {
  return {
    type: RECEIVE_POST,
    status: 'Done',
    post: json
  }
}

export function fetchPost(id) {
  return function (dispatch) {
    dispatch(requestPost());
    
    return fetch('http://localhost:5001/posts/' + id, { headers: { 'Authorization': 'hello' }})
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(json => dispatch(receivePost(json)))
  }
}

export function sortPosts(sortBy) {
  return {
    type: SORT_POSTS,
    sortBy
  }
}

function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function sendPostVote({ id, vote }) {
  return function (dispatch) {
    return fetch(
      'http://localhost:5001/posts/' + id,
      {
        headers: {
          'Authorization': 'hello',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ option: vote })
      }
    )
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(json => dispatch(updatePost(json)))
  }
}

export function sendPost({ post, method }) {
  return function (dispatch) {
    return fetch('http://localhost:5001/posts' + (method === 'PUT' ? '/' + post.id : ''), {
      headers: {
        'Authorization': 'hello',
        'Content-Type': 'application/json'
      },
      method: method,
      body: JSON.stringify(post)
    })
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(json => {
      return dispatch(updatePost(json));
    })
  }
}