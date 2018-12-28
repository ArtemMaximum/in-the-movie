import _ from 'lodash'
import shortid from 'shortid'
import React, { PureComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  Row,
  Col,
  Jumbotron,
  CardImg, Card, CardBody, CardTitle, CardText,
} from 'reactstrap'

import { connect } from 'react-redux'
import { fetchMovieDetails } from '../actions/item'
import { fetchRecommendedMoviesList, loadMoreRecommendationsList } from '../actions/list'
import { ContentTemplate } from '../../../ui'


class MovieDetails extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { fetchMovie, fetchRecommendedMovies, match: { params: { movieId } } } = this.props;
    fetchMovie(movieId)
    fetchRecommendedMovies(movieId)
  }

  render() {
    const {
      movie, /*isLoading,*/
      recommendedList,
      loadMoreRecommendations,
      pagination,
      match: { params: { movieId } },
      /*isRecommendationsLoading,*/
    } = this.props

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
              <p>{movie.title} - {movie.tagline}</p>
              <hr className="my-2" />
              <ul>
                {movie && movie.genres && movie.genres.map(genre =>
                  <li key={`genre-${genre.id}`}>{genre.name}</li>,
                )}
              </ul>
            </Jumbotron>
            <br /><br />
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
                const nextPage = parseInt(pagination.page, 10) + 1

                if (this.fetchedRecommendedPage !== nextPage) {
                  setTimeout(() => {
                    loadMoreRecommendations(movieId, parseInt(pagination.page, 10) + 1)
                  }, 300)
                  this.fetchedRecommendedPage = nextPage
                }
              }}
              loader="Loading..."
              hasMore={!_.isEmpty(pagination) && (pagination.page < pagination.totalPages)}
            >
              <Row>
                {
                  recommendedList && recommendedList.map(recommendedMovie =>
                    (<Col md={6} key={`recommended-${recommendedMovie.id}-${shortid.generate()}`}>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <Link to={`/movie/${recommendedMovie.id}`}>
                        <Card style={{ marginBottom: '25px' }}>
                          <CardImg
                            top
                            width="100%"
                            height="auto"
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${recommendedMovie.poster_path}`}
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>{recommendedMovie.original_title}</CardTitle>
                            {/*<CardSubtitle>Card subtitle</CardSubtitle>*/}
                            <CardText>{recommendedMovie.overview}
                            </CardText>
                          </CardBody>
                        </Card>
                      </Link>
                      {/* eslint-disable-next-line react/jsx-closing-tag-location*/}
                    </Col>))
                }
              </Row>
            </InfiniteScroll>
          </Col>
        </Row>
      </ContentTemplate>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMovie: bindActionCreators(fetchMovieDetails, dispatch),
    fetchRecommendedMovies: bindActionCreators(fetchRecommendedMoviesList, dispatch),
    loadMoreRecommendations: bindActionCreators(loadMoreRecommendationsList, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movies.item,
    recommendedList: state.movies.recommendedList,
    pagination: state.movies.recommendedListPagination,
    isLoading: state.movies.isLoading,
    isRecommendationsLoading: state.movies.isRecommendationsLoading,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails))
