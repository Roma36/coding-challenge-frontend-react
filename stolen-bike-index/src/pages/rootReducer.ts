import { combineReducers, Action } from 'redux';

// reducers
import index, { IndexState } from './index/reducer';
import details, { DetailsState } from './details/reducer';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export interface IState {
  index: IndexState;
  details: DetailsState;
}

export default combineReducers({
  index,
  details,
});

export type ThunkResult<R> = ThunkAction<R, IState, null, Action>;

export type ThunkDispatch = ThunkDispatch<IState, null, Action>;
