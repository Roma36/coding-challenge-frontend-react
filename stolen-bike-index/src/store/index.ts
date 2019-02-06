import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../pages/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
}
