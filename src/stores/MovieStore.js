import { observable, action } from 'mobx';
import api from '../api';

class MovieStore {
  @observable search = '';
  @observable movies = [];
  @observable recommendedMovies = [];
  @observable movie = {};
  @observable pagination = {};
  @observable recommendedListPagination = {};
  @observable isLoading = false;
  @observable isRecommendationsLoading = false;
  @observable errorMessage = '';

  @action('Receive movies list') getMoviesList(page = 1, isReplaced = false) {
    this.isLoading = true;
    api
      .get('/movie/popular', {
        params: {
          page,
        },
      })
      .then(({ data }) => {
        if (!data.status_code) {
          this.movies = isReplaced ? data.results : [...this.movies, ...data.results];
          this.pagination = {
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
          };
        } else {
          this.errorMessage = data.status_message;
        }
        this.isLoading = false;
      });
  }

  @action('Receive recommendations list') getRecommendationsList(
    movieId,
    page,
    isReplaced = false,
  ) {
    this.isRecommendationsLoading = true;
    api
      .get(`/movie/${movieId}/recommendations`, {
        params: {
          page,
        },
      })
      .then(({ data }) => {
        if (!data.status_code) {
          this.recommendedMovies = isReplaced
            ? data.results
            : [...this.recommendedMovies, data.results];
          this.recommendedListPagination = {
            page: data.page,
            totalPages: data.total_pages,
            totalResults: data.total_results,
          };
        } else {
          this.errorMessage = data.status_message;
        }
        this.isRecommendationsLoading = false;
      });
  }

  @action('Search movies list') searchMoviesList(query, page = 1, isReplaced = true) {
    if ((query && query.length < 1) || query === '') {
      this.movies = [];

      this.getMoviesList();
    } else {
      this.isLoading = true;
      api
        .get('/search/movie', {
          params: {
            query,
            page,
          },
        })
        .then(({ data }) => {
          if (!data.status_code) {
            this.movies = isReplaced ? data.results : [...this.movies, ...data.results];
            this.pagination = {
              page: data.page,
              totalPages: data.total_pages,
              totalResults: data.total_results,
            };
          } else {
            this.errorMessage = data.status_message;
          }
          this.isLoading = false;
        });
    }
  }

  @action('Load more movies') loadMoreMovies(query, page = 1, isReplaced = false) {
    if (query.length < 1) {
      this.getMoviesList(page);
    } else {
      this.searchMoviesList(query, page, isReplaced);
    }
  }

  @action('Get movie details') getMovieDetails(movieId) {
    this.isLoading = true;
    api.get(`/movie/${movieId}`).then(({ data }) => {
      if (!data.status_code) {
        this.movie = data;
      } else {
        this.errorMessage = data.status_message;
      }
      this.isLoading = false;
    });
  }
}

const movieStore = new MovieStore();

export default movieStore;
