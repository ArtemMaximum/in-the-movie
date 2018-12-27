import {
  FETCH_MOVIES_LIST_START,
  FETCH_MOVIES_LIST_SUCCESS,
  FETCH_MOVIES_LIST_FAILURE,

  CLEAR_MOVIES_LIST,
} from './action-types'


const initialState = {
  search: '',
  data: [],
  pagination: {},
  isLoading: false,
  errorMessage: '',
}

const receiveMoviesList = (state, action) => {
  switch (action.type) {
    case FETCH_MOVIES_LIST_START:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case FETCH_MOVIES_LIST_SUCCESS:
      return Object.assign({}, state, {
        data: action.data,
        pagination: action.pagination,
        isLoading: false,
      })
    case FETCH_MOVIES_LIST_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.errors,
        isLoading: false,
      })

    default:
      return state
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_LIST_START:
    case FETCH_MOVIES_LIST_SUCCESS:
    case FETCH_MOVIES_LIST_FAILURE:
      return receiveMoviesList(state, action)

    case CLEAR_MOVIES_LIST:
      return Object.assign({}, state, {
        data: [],
        pagination: {},
      })
    default:
      return state
  }
}
