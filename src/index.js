import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers';
import logger from 'redux-logger';
import sagas from 'sagas';
import i18n from './i18n';
import i18next from 'i18next';

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware();

const middleware = [ sagaMiddleware, logger, routerMiddleware(history)];

const store = createStore(
  reducers(history),
  compose (
  applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // debug for redux store, please keep it for now, we will disable it when we have a production push ready
  )
);

sagaMiddleware.run(sagas);

// figure out why we need this to stop breaking chrome/firefox/some browser
i18next.changeLanguage('en');


const render = () => {
  i18n.init().then(() => {
    ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>, document.getElementById('root')
  )})
}

render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })

  // Reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(reducers(history))
  })
}
