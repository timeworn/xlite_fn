import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import browserHistory from 'browser-history';

import createRootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  createRootReducer(browserHistory),
  composeEnhancers(
    applyMiddleware(
      thunk,
      routerMiddleware(browserHistory)
    )
  )
);
