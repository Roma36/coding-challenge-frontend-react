import config from '../../config';
import { Dispatch } from 'redux';

export const loadIndex = () => {
  return (dispatch: Dispatch) => {
    dispatch(loadIndexRequest());

    fetch(`${config.api}/incidents?proximity=berlin`)
      .then(res => {
        dispatch(loadIndexSuccess(res as any));
      })
      .catch(err => {
        dispatch(loadIndexFailure(err.message));
      });
  };
};

export interface TheftData {
  id: string;
}

export type LoadIndexAction =
  | { type: 'LOAD_INDEX_REQUEST' }
  | { type: 'LOAD_INDEX_SUCCESS'; items: TheftData[] }
  | { type: 'LOAD_INDEX_FAILURE'; error: string };

// action creators
export function loadIndexRequest(): LoadIndexAction {
  return { type: 'LOAD_INDEX_REQUEST' };
}

export function loadIndexSuccess(items: TheftData[]): LoadIndexAction {
  return { type: 'LOAD_INDEX_SUCCESS', items };
}

export function loadIndexFailure(error: string): LoadIndexAction {
  return { type: 'LOAD_INDEX_FAILURE', error };
}
