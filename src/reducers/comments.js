import {
  RECEIVE_COMMENTS,
  UPDATE_COMMENT
} from '../actions';

function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        data: action.comments.reduce(
          (obj, item) => {
            obj[item['id']] = item
            return obj
          }, {})
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.comment.id]: action.comment
        }
      }
    default:
      return state;
  }
}

export function selectCommentsAsArray(state) {
  return state.comments.data ? Object.values(state.comments.data) : [];
}

export default comments