import _ from 'lodash'
import api from '../../../api';
import {
  FETCH_GENRES_LIST_START,
  FETCH_GENRES_LIST_SUCCESS,
  FETCH_GENRES_LIST_FAILURE,
} from '../action-types';


export function fetchGenresList() {
  return (dispatch) => {
    dispatch({
      type: FETCH_GENRES_LIST_START,
    });

    return api.get('/genre/movie/list').then(({ data }) => {
      if (!data.status_code) {
        const genresStore = {};

        _.forEach(data.genres, (genre) => {
          genresStore[genre.id] = genre
        })

        dispatch({
          type: FETCH_GENRES_LIST_SUCCESS,
          data: genresStore,
        });
      } else {
        dispatch({
          type: FETCH_GENRES_LIST_FAILURE,
          errors: data.status_message,
        });
      }
    }).catch(err => console.log('Error: ', err)); // eslint-disable-line unicorn/catch-error-name
  };
}

export default [fetchGenresList];
