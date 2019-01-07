import _ from 'lodash';
// import shortid from 'shortid';
import { observable, action } from 'mobx';
import api from '../api';

class GenreStore {
  @observable genres = {};
  @observable isLoading = false;
  @observable errorMessage = '';

  @action('Receive genres list') getGenresList() {
    this.isLoading = true;
    api.get('/genre/movie/list').then(({ data }) => {
      if (!data.status_code) {
        _.forEach(data.genres, (genre) => {
          this.genres[genre.id] = genre;
        });
      } else {
        this.errorMessage = data.status_message;
      }
      this.isLoading = false;
    });
  }
}

const genreStore = new GenreStore();

export default genreStore;
