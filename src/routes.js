import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { RootTemplate, NotFoundPage } from './ui'
import MoviesList from './modules/movies/containers/list'
import MovieDetails from './modules/movies/containers/item'
import TodoList from './modules/demo/TodoList'

import configureStore from './configure-store'


const store = configureStore()

export default () => (
  <RootTemplate sidebar="Sidebar">
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route exact path="/movie/:movieId" component={MovieDetails} />
        <Route exact path="/demo/mobx-todo" component={TodoList} />
        <Route component={NotFoundPage} />
      </Switch>
    </Provider>
  </RootTemplate>
)
