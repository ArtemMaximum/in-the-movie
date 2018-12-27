import configureStore from 'configure-store'
import React from 'react'

import { Provider } from 'react-redux'
import { RootTemplate, NotFoundPage } from 'ui'
import { Switch, Route } from 'react-router-dom'

import MoviesList from 'modules/movies/containers/list'


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
