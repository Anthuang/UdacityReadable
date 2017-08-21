import {
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  SORT_POSTS,
  UPDATE_POST
} from '../actions';

function posts(state = { sortBy: 'voteScore' }, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        category: action.category,
        data: action.posts.reduce(
          (obj, item) => {
            obj[item['id']] = item
            return obj
          }, {})
      }
    case REQUEST_POST:
      return {
        ...state,
        status: action.status
      }
    case RECEIVE_POST:
      return {
        ...state,
        status: action.status,
        activePost: action.post
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
        },
        activePost: action.post
      }
    default:
      return state;
  }
}

export function selectPostsAsArray(state) {
  return state.posts.data ? Object.values(state.posts.data) : [];
}

export default posts