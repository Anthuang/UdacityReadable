import {
  RECEIVE_CATEGORIES
} from '../actions';

function categories(state = {
  data: []
}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        data: action.categories
      }
    default:
      return state;
  }
}

export default categories;