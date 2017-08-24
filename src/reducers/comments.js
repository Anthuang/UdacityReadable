import {
  RECEIVE_COMMENTS,
  REQUEST_COMMENT,
  RECEIVE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../actions';

function comments(state = {
  data: {}
}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        data: action.comments.reduce(
          (obj, item) => {
            if (!item['deleted']) obj[item['id']] = item;
            return obj;
          }, {})
      }
    case REQUEST_COMMENT:
      return {
        ...state,
        status: action.status
      }
    case RECEIVE_COMMENT:
      return {
        ...state,
        status: action.status,
        data: {
          ...state.data,
          [action.comment.id]: action.comment
        }
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.comment.id]: action.comment
        }
      }
    case DELETE_COMMENT:
      let newState = { ...state };
      delete newState.data[action.id];
      return newState;
    default:
      return state;
  }
}

export function selectCommentsAsArray(state) {
  return state.comments.data ? Object.values(state.comments.data) : [];
}

export default comments;