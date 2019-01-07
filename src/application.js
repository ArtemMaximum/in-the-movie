import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Routes from './routes';
import { theme, globalStyles } from './theme';

/* Stores */
import observableTodoStore from './stores/ObservableTodoStore';
import movieStore from './stores/MovieStore';
import genreStore from './stores/GenreStore';

const stores = { observableTodoStore, movieStore, genreStore };

const render = () => {
  // eslint-disable-next-line no-unused-expressions
  globalStyles();
  const renderFunction =
    process.env.NODE_ENV === 'development' ? ReactDOM.render : ReactDOM.hydrate;

  renderFunction(
    <Provider {...stores}>
      <AppContainer>
        <ThemeProvider theme={theme}>
          <div>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </AppContainer>
    </Provider>,
    document.getElementById('website'),
  );
};

render();

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./routes', render);
  }
}
