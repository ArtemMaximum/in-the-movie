import {
  FETCH_MOVIES_LIST_START,
  FETCH_MOVIES_LIST_SUCCESS,
  FETCH_MOVIES_LIST_FAILURE,

  FETCH_RECOMMENDED_MOVIES_LIST_START,
  FETCH_RECOMMENDED_MOVIES_LIST_SUCCESS,
  FETCH_RECOMMENDED_MOVIES_LIST_FAILURE,

  FETCH_MOVIE_DETAILS_START,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,

  CLEAR_MOVIES_LIST,
} from './action-types'


const initialState = {
  search: '',
  list: [],
  recommendedList: [],
  item: {},
  pagination: {},
  recommendedListPagination: {},
  isLoading: false,
  isRecommendationsLoading: false,
  errorMessage: '',
};

const receiveMoviesList = (state, action) => {
  switch (action.type) {
    case FETCH_MOVIES_LIST_START:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case FETCH_MOVIES_LIST_SUCCESS:
      return Object.assign({}, state, {
        list: action.isReplaced ? action.data : [...state.list, ...action.data],
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
};

const receiveRecommendedMoviesList = (state, action) => {
  switch (action.type) {
    case FETCH_RECOMMENDED_MOVIES_LIST_START:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case FETCH_RECOMMENDED_MOVIES_LIST_SUCCESS:
      return Object.assign({}, state, {
        recommendedList: action.isReplaced
          ?
          action.data
          :
          [...state.recommendedList, ...action.data],
        recommendedListPagination: action.pagination,
        isRecommendationsLoading: false,
      })
    case FETCH_RECOMMENDED_MOVIES_LIST_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.errors,
        isLoading: false,
      })

    default:
      return state
  }
};

const receiveMovieDetails = (state, action) => {
  switch (action.type) {
    case FETCH_MOVIE_DETAILS_START:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        item: action.data,
        isLoading: false,
      })
    case FETCH_MOVIE_DETAILS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.errors,
        isLoading: false,
      })

    default:
      return state
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_LIST_START:
    case FETCH_MOVIES_LIST_SUCCESS:
    case FETCH_MOVIES_LIST_FAILURE:
      return receiveMoviesList(state, action)

    case FETCH_RECOMMENDED_MOVIES_LIST_START:
    case FETCH_RECOMMENDED_MOVIES_LIST_SUCCESS:
    case FETCH_RECOMMENDED_MOVIES_LIST_FAILURE:
      return receiveRecommendedMoviesList(state, action)

    case FETCH_MOVIE_DETAILS_START:
    case FETCH_MOVIE_DETAILS_SUCCESS:
    case FETCH_MOVIE_DETAILS_FAILURE:
      return receiveMovieDetails(state, action)

    case CLEAR_MOVIES_LIST:
      return Object.assign({}, state, {
        list: [],
        pagination: {},
      })
    default:
      return state
  }
}
