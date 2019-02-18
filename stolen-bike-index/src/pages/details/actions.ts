import { IncidentData } from './../index/model';
import { LoadDetailsAction, ResetDetailsAction } from './model';
import { ThunkResult } from './../rootReducer';
import config from '../../config';
import { Dispatch } from 'redux';
import { getResponse } from '../../utils/http';

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

export function resetDetails(): ResetDetailsAction {
  return { type: 'RESET_DETAILS' };
}
