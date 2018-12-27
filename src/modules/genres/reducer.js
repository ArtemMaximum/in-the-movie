import {
  FETCH_GENRES_LIST_START,
  FETCH_GENRES_LIST_SUCCESS,
  FETCH_GENRES_LIST_FAILURE,
} from './action-types'


const initialState = {
  data: [],
  isLoading: false,
  errorMessage: '',
}

const receiveMoviesList = (state, action) => {
  switch (action.type) {
    case FETCH_GENRES_LIST_START:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case FETCH_GENRES_LIST_SUCCESS:
      return Object.assign({}, state, {
        data: action.data,
        isLoading: false,
      })
    case FETCH_GENRES_LIST_FAILURE:
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
    case FETCH_GENRES_LIST_START:
    case FETCH_GENRES_LIST_SUCCESS:
    case FETCH_GENRES_LIST_FAILURE:
      return receiveMoviesList(state, action)

    default:
      return state
  }
}
