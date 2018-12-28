// import _ from 'lodash'
import api from '../../../api';
import {
  FETCH_MOVIE_DETAILS_START,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
} from '../action-types';


export function fetchMovieDetails(movieId) {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIE_DETAILS_START,
    });

    return api.get(`/movie/${movieId}`).then(({ data }) => {
      if (!data.status_code) {
        dispatch({
          type: FETCH_MOVIE_DETAILS_SUCCESS,
          data,
        });
      } else {
        dispatch({
          type: FETCH_MOVIE_DETAILS_FAILURE,
          errors: data.status_message,
        });
      }
    }).catch(err => console.log('Error: ', err)); // eslint-disable-line unicorn/catch-error-name
  };
}

export default [fetchMovieDetails];
