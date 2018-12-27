import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { RootTemplate, NotFoundPage } from './ui'
import MoviesList from './modules/movies/containers/list'

import configureStore from './configure-store'


const store = configureStore()

export default () => (
  <RootTemplate>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route component={NotFoundPage} />
      </Switch>
    </Provider>
  </RootTemplate>
)
