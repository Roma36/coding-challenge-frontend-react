import { getSearchText, getCurrentPage } from './selectors';
import { IState, ThunkResult, ThunkDispatch } from './../rootReducer';
import config from '../../config';
import { Dispatch } from 'redux';
import { getResponse } from '../../utils/http';
import { IncidentData, LoadIndexAction } from './model';

// action creators
// load actions
export const loadIndex: () => ThunkResult<void> = () => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const state = getState();
    const filterBy = getSearchText(state);
    const page = getCurrentPage(state);

    dispatch(loadIndexRequest());

    fetch(`${config.api}incidents?proximity=berlin&incident_type=theft&query=${filterBy}`)
      .then(getResponse)
      .then(res => res.incidents || [])
      .then((incidents: IncidentData[]) => {
        dispatch(loadIndexSuccess(incidents));
      })
      .catch(err => {
        dispatch(loadIndexFailure(err.message));
      });
  };
};

export function loadIndexRequest(): LoadIndexAction {
  return { type: 'LOAD_INDEX_REQUEST' };
}

export function loadIndexSuccess(incidents: IncidentData[]): LoadIndexAction {
  return { type: 'LOAD_INDEX_SUCCESS', incidents };
}

export function loadIndexFailure(error: string): LoadIndexAction {
  return { type: 'LOAD_INDEX_FAILURE', error };
}

// filter actions
export function applyFilter(filterBy: string): ThunkResult<void> {
  return (dispatch: ThunkDispatch) => {
    dispatch({ type: 'FILTER_INDEX', filterBy });
    dispatch(paginate(1));
    dispatch(loadIndex());
  };
}

// pagination actions
export function paginate(page: number) {
  return { type: 'PAGINATE', page };
}
