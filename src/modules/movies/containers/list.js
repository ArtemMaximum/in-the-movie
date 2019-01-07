import _ from 'lodash';
import { observer, inject } from 'mobx-react';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { withRouter, Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle /*CardSubtitle, */,
  CardText,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap';

import { ContentTemplate } from '../../../ui';

class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = { searchValue: '' };
  }

  componentDidMount() {
    const { genreStore, movieStore } = this.props;
    movieStore.getMoviesList();
    genreStore.getGenresList();
  }

  render() {
    const {
      movieStore,
      genreStore: { genres },
      movieStore: { movies, pagination },
    } = this.props;

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
              });
              movieStore.searchMoviesList(e.target.value);
            }}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="inverse"
              onClick={() => {
                movieStore.searchMoviesList(this.state.searchValue);
              }}
            >
              Найти
            </Button>
          </InputGroupAddon>
        </InputGroup>
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
            const nextPage = parseInt(pagination.page, 10) + 1;

            if (this.fetchedPage !== nextPage) {
              setTimeout(() => {
                movieStore.loadMoreMovies(
                  this.state.searchValue,
                  parseInt(pagination.page, 10) + 1,
                );
              }, 300);
              this.fetchedPage = nextPage;
            }
          }}
          loader="Loading..."
          hasMore={!_.isEmpty(pagination) && pagination.page < pagination.totalPages}
        >
          <Row>
            {movies &&
              movies.map(movie => (
                <Col md={6} key={movie.id}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link to={`/movie/${movie.id}`}>
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
                        <CardText>{movie.overview}</CardText>
                      </CardBody>
                      <hr />
                      <ul>
                        {movie.genre_ids &&
                          movie.genre_ids.map(id => (
                            <li key={`genre-${id}`}>{genres[id] && genres[id].name}</li>
                          ))}
                      </ul>
                    </Card>
                  </Link>
                  {/* eslint-disable-next-line react/jsx-closing-tag-location*/}
                </Col>
              ))}
          </Row>
        </InfiniteScroll>
      </ContentTemplate>
    );
  }
}

export default inject('genreStore', 'movieStore')(withRouter(observer(MoviesList)));
