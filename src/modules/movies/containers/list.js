// import _ from 'lodash'
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchMoviesList } from '../actions/list'


class MoviesList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.fetchMoviesList()
  }

  render() {
    const {
      movies, pagination, isLoading, ...rest
    } = this.props

    console.log('\n ... movies ...', movies)
    console.log('\n ... pagination ...', pagination)
    console.log('\n ... isLoading ...', isLoading)
    console.log('\n ... rest ...', rest)

    return (
      <h1>Hello, World!</h1>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMoviesList: bindActionCreators(fetchMoviesList, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies.data,
    pagination: state.movies.pagination,
    isLoading: state.movies.isLoading,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesList))
