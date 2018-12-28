// import _ from 'lodash'
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  Row,
  Col,
  Jumbotron,
  CardImg,
} from 'reactstrap'

import { connect } from 'react-redux'
import { fetchMovieDetails } from '../actions/item'
import { ContentTemplate } from '../../../ui'


class MovieDetails extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { fetchMovie, match: { params: { movieId } } } = this.props;
    fetchMovie(movieId)
  }

  render() {
    const {
      movie, isLoading,
    } = this.props

    console.log('\n ... movie ...', movie)
    console.log('\n ... isLoading ...', isLoading)

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
                {movie.genres.map(genre =>
                  <li key={`genre-${genre.id}`}>{genre.name}</li>,
                )}
              </ul>
            </Jumbotron>
          </Col>
        </Row>
      </ContentTemplate>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMovie: bindActionCreators(fetchMovieDetails, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movies.item,
    isLoading: state.movies.isLoading,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails))
