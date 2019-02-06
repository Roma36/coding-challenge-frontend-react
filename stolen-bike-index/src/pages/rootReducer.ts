import { combineReducers } from 'redux';

// reducers
import index, { IndexState } from './index/reducer';
import details from './details/reducer';

export interface IState {
  index: IndexState;
  details: any;
}

export default combineReducers({
  index,
  details,
});
