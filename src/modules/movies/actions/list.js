// import _ from 'lodash'
import api from '../../../api';
import {
  FETCH_MOVIES_LIST_START,
  FETCH_MOVIES_LIST_SUCCESS,
  FETCH_MOVIES_LIST_FAILURE,

  CLEAR_MOVIES_LIST,
} from '../action-types';


export function fetchMoviesList(page = 1, isReplaced = false) {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIES_LIST_START,
    });

    return api.get('/movie/popular', {
      params: {
        page,
      },
    }).then(({ data }) => {
      if (!data.status_code) {
        dispatch({
          type: FETCH_MOVIES_LIST_SUCCESS,
          data: data.results,
          pagination: {
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
          },
          isReplaced,
        });
      } else {
        dispatch({
          type: FETCH_MOVIES_LIST_FAILURE,
          errors: data.status_message,
        });
      }
    }).catch(err => console.log('Error: ', err)); // eslint-disable-line unicorn/catch-error-name
  };
}


export function searchMoviesList(query, page = 1, isReplaced = true) {
  return (dispatch) => {
    if (query && query.length < 1) {
      dispatch({
        type: CLEAR_MOVIES_LIST,
      });

      return dispatch(fetchMoviesList())
    }
    dispatch({
      type: FETCH_MOVIES_LIST_START,
    });

    return api.get('/search/movie', {
      params: {
        query,
        page,
      },
    }).then(({ data }) => {
      if (!data.status_code) {
        dispatch({
          type: FETCH_MOVIES_LIST_SUCCESS,
          data: data.results,
          pagination: {
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
          },
          isReplaced,
        });
      } else {
        dispatch({
          type: FETCH_MOVIES_LIST_FAILURE,
          errors: data.status_message,
        });
      }
    }).catch(err => console.log('Error: ', err)); // eslint-disable-line unicorn/catch-error-name
  };
}

export function loadMoreMovies(query, page = 1, isReplaced = false) {
  return (dispatch) => {
    if (query.length < 1) {
      return dispatch(fetchMoviesList(page))
    }
    return dispatch(searchMoviesList(query, page, isReplaced))
  }
}

export default [fetchMoviesList, searchMoviesList, loadMoreMovies];
