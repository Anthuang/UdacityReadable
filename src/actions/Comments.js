export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_COMMENT = 'REQUEST_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

function receiveComments(json) {
  return {
    type: RECEIVE_COMMENTS,
    comments: json
  }
}

export function fetchComments(id) {
  return function (dispatch) {
    return fetch('http://localhost:5001/posts/' + id + '/comments', { headers: { 'Authorization': 'hello' }})
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(json => dispatch(receiveComments(json)))
  }
}

function requestComment() {
  return {
    type: REQUEST_COMMENT,
    status: 'Loading'
  }
}

function receiveComment(json) {
  return {
    type: RECEIVE_COMMENT,
    status: 'Done',
    comment: json
  }
}

export function fetchComment(id) {
  return function (dispatch) {
    dispatch(requestComment());
    
    return fetch('http://localhost:5001/comments/' + id, { headers: { 'Authorization': 'hello' }})
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(json => dispatch(receiveComment(json)))
  }
}

function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function sendCommentVote({ id, vote }) {
  return function (dispatch) {
    return fetch(
      'http://localhost:5001/comments/' + id,
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
    .then(json => dispatch(updateComment(json)))
  }
}

export function sendComment({ comment, method }) {
  return function (dispatch) {
    return fetch('http://localhost:5001/comments' + (method === 'PUT' ? '/' + comment.id : ''), {
      headers: {
        'Authorization': 'hello',
        'Content-Type': 'application/json'
      },
      method: method,
      body: JSON.stringify(comment)
    })
    .then(
      response => response.json(),
      error => console.error(error)
    )
    .then(json => {
      return dispatch(updateComment(json));
    })
  }
}

function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function sendDeleteComment(id) {
  return function (dispatch) {
    return fetch('http://localhost:5001/comments/' + id,
    {
      headers: {
        'Authorization': 'hello'
      },
      method: 'DELETE'
    })
    .then(
      response => dispatch(deleteComment(id)),
      error => console.error(error)
    );
  }
}