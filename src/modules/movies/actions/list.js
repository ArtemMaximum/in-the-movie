// import _ from 'lodash'
import api from '../../../api';
import {
  FETCH_MOVIES_LIST_START,
  FETCH_MOVIES_LIST_SUCCESS,
  FETCH_MOVIES_LIST_FAILURE,
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

export default [fetchMoviesList];
