import _ from 'lodash';
import shortid from 'shortid'
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { withRouter, Link } from 'react-router-dom';
import {
  Row,
  Col,
  Jumbotron,
  Card,
  CardImg,
  CardBody,
  CardTitle /*CardSubtitle, */,
  CardText,
} from 'reactstrap';

import { ContentTemplate } from '../../../ui';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      movieStore,
      match: {
        params: { movieId },
      },
    } = this.props;
    movieStore.getRecommendationsList(movieId, 1, true)
    movieStore.getMovieDetails(movieId);
  }

  componentWillReceiveProps(nextProps) {
    const { movieStore, match: { params: { movieId } } } = this.props;
    if (movieId !== nextProps.match.params.movieId) {
      movieStore.getRecommendationsList(nextProps.match.params.movieId, 1, true)
      movieStore.getMovieDetails(nextProps.match.params.movieId);
    }
  }

  render() {
    const {
      movieStore,
      movieStore: { movie, recommendedMovies, recommendedListPagination },
      match: {
        params: { movieId },
      },
    } = this.props;

    // movieStore.getRecommendationsList();

    return (
      <ContentTemplate>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">{movie.original_title}</h1>
              <CardImg
                top
                width="100%"
                height="auto"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt="Card image cap"
              />
              <br />
              <br />
              <p className="lead">{movie.overview}</p>
              <hr className="my-2" />
              <p>
                {movie.title} - {movie.tagline}
              </p>
              <hr className="my-2" />
              <ul>
                {movie.genres &&
                  movie.genres.map(genre => <li key={`genre-${genre.id}`}>{genre.name}</li>)}
              </ul>
            </Jumbotron>
            <br />
            <br />
            <h2>Recommended Movies:</h2>

            <InfiniteScroll
              element="div"
              style={{
                display: 'table-row-group',
                verticalAlign: 'middle',
                borderColor: 'inherit',
              }}
              pageStart={0}
              threshold={10}
              loadMore={() => {
                const nextPage = parseInt(recommendedListPagination.page, 10) + 1;

                if (this.fetchedRecommendedPage !== nextPage) {
                  setTimeout(() => {
                    movieStore.getRecommendationsList(
                      movieId,
                      parseInt(recommendedListPagination.page, 10) + 1,
                    );
                  }, 300);
                  this.fetchedRecommendedPage = nextPage;
                }
              }}
              loader="Loading..."
              hasMore={
                !_.isEmpty(recommendedListPagination) &&
                recommendedListPagination.page < recommendedListPagination.totalPages
              }
            >
              <Row>
                {recommendedMovies &&
                  recommendedMovies.map(recommendedMovie => (
                    <Col md={6} key={`recommended-${recommendedMovie.id}-${shortid.generate()}`}>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <Link to={`/movie/${recommendedMovie.id}`}>
                        <Card style={{ marginBottom: '25px' }}>
                          <CardImg
                            top
                            width="100%"
                            height="auto"
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${
                              recommendedMovie.poster_path
                            }`}
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>{recommendedMovie.original_title}</CardTitle>
                            {/*<CardSubtitle>Card subtitle</CardSubtitle>*/}
                            <CardText>{recommendedMovie.overview}</CardText>
                          </CardBody>
                        </Card>
                      </Link>
                      {/* eslint-disable-next-line react/jsx-closing-tag-location*/}
                    </Col>
                  ))}
              </Row>
            </InfiniteScroll>
          </Col>
        </Row>
      </ContentTemplate>
    );
  }
}

export default inject('movieStore')(withRouter(observer(MovieDetails)));
