import { combineReducers } from 'redux';

// reducers
import indexReducer from './index/reducer';
import detailsReducer from './details/reducer';

export default combineReducers({
  indexReducer,
  detailsReducer
});
