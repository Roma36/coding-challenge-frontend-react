import { ThunkResult } from './../rootReducer';
import config from '../../config';
import { Dispatch } from 'redux';
import { getResponse } from '../../utils/http';
import { IncidentData } from '../index/actions';

export type LoadDetailsAction =
  | { type: 'LOAD_DETAILS_REQUEST' }
  | { type: 'LOAD_DETAILS_SUCCESS'; incident: IncidentData }
  | { type: 'LOAD_DETAILS_FAILURE'; error: string };

// action creators
// load actions
export const loadTheftDetails: (id: number) => ThunkResult<void> = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(loadTheftRequest());

    fetch(`${config.api}incidents/${id}`)
      .then(getResponse)
      .then(res => res.incident)
      .then((incident: IncidentData) => {
        dispatch(loadTheftSuccess(incident));
      })
      .catch(err => {
        dispatch(loadTheftFailure(err.message));
      });
  };
};

export function loadTheftRequest(): LoadDetailsAction {
  return { type: 'LOAD_DETAILS_REQUEST' };
}

export function loadTheftSuccess(incident: IncidentData): LoadDetailsAction {
  return { type: 'LOAD_DETAILS_SUCCESS', incident };
}

export function loadTheftFailure(error: string): LoadDetailsAction {
  return { type: 'LOAD_DETAILS_FAILURE', error };
}
