export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

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