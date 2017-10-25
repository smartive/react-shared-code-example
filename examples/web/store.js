import { createStore, combineReducers, appyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from '../../src';

export default createStore(
  combineReducers({
    ...reducers,
  }),
  appyMiddleware(thunk),
);
