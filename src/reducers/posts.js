import {
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  SORT_POSTS,
  UPDATE_POST,
  DELETE_POST
} from '../actions';

function posts(state = { 
  sortBy: 'voteScore',
  data: {}
}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        category: action.category,
        data: action.posts.reduce(
          (obj, item) => {
            if (!item['deleted']) obj[item['id']] = item;
            return obj;
          }, {})
      }
    case REQUEST_POST:
      return {
        ...state,
        status: action.status
      }
    case RECEIVE_POST:
      return action.post.error ? {
        ...state,
        status: action.status
      } : {
        ...state,
        status: action.status,
        data: {
          ...state.data,
          [action.post.id]: action.post
        }
      }
    case SORT_POSTS:
      return {
        ...state,
        sortBy: action.sortBy
      }
    case UPDATE_POST:
      return {
        ...state,
        data: {
          ...state.data,
          [action.post.id]: action.post
        }
      }
    case DELETE_POST:
      let newState = { ...state };
      delete newState.data[action.id];
      return newState;
    default:
      return state;
  }
}

export function selectPostsAsArray(state) {
  return state.posts.data ? Object.values(state.posts.data) : [];
}

export default posts;