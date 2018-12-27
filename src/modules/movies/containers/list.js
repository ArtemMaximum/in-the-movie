// import _ from 'lodash'
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle, /*CardSubtitle, */
  CardText,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap'

import { connect } from 'react-redux'
import { fetchMoviesList } from '../actions/list'
import { fetchGenresList } from '../../genres/actions/list'
import { ContentTemplate } from '../../../ui'


class MoviesList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.fetchMoviesList()
    this.props.fetchGenresList()
  }

  render() {
    const {
      movies, genres, /* pagination, isLoading*/
    } = this.props

    // console.log('\n ... movies ...', movies)
    // console.log('\n ... pagination ...', pagination)
    // console.log('\n ... isLoading ...', isLoading)
    // console.log('\n ... rest ...', rest)

    return (
      <ContentTemplate>
        <InputGroup style={{ marginBottom: '25px' }}>
          <Input
            type="text"
            id="search-input"
            placeholder="Начните вводить..."
            value={this.state.searchValue}
            onChange={(e) => {
              this.setState({
                searchValue: e.target.value,
              })
              console.log(`/search/movie&query=${e.target.value}`)
              // rest.fetchGroupsList(e.target.value, undefined, true)
            }}
          />
          <InputGroupAddon addonType="append">
            <Button color="inverse">
              Найти
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Row>
          {
            movies.map(movie =>
              (<Col md={6} key={movie.id}>
                <Card style={{ marginBottom: '25px' }}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>{movie.original_title}</CardTitle>
                    {/*<CardSubtitle>Card subtitle</CardSubtitle>*/}
                    <CardText>{movie.overview}
                    </CardText>
                  </CardBody>
                  <hr />
                  <ul>
                    {movie.genre_ids && movie.genre_ids.map(id =>
                      <li key={`genre-${id}`}>{genres[id] && genres[id].name}</li>,
                    )}
                  </ul>
                </Card>
                {/* eslint-disable-next-line react/jsx-closing-tag-location*/}
              </Col>))
          }
        </Row>
      </ContentTemplate>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMoviesList: bindActionCreators(fetchMoviesList, dispatch),
    fetchGenresList: bindActionCreators(fetchGenresList, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies.data,
    genres: state.genres.data,
    pagination: state.movies.pagination,
    isLoading: state.movies.isLoading,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList))
