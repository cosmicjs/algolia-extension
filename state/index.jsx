import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import indices from './indices/reducer';
import settings from './settings/reducer';

const rootReducer = combineReducers({
  indices,
  settings,
});

const initializeStore = (initialState = {}) => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default initializeStore;
