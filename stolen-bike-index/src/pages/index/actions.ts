import { getSearchText } from './selectors';
import { IState } from './../rootReducer';
import config from '../../config';
import { Dispatch } from 'redux';
import { getResponse } from '../../utils/http';

export interface IncidentData {
  id: number;
  address: string;
  description: string;
  media: {
    image_url: string;
    image_url_thumb: string;
  };
  occurred_at: number;
  source: {
    name: string;
    html_url: string;
    api_url: string;
  };
  title: string;
  type: string;
  updated_at: number;
  url: string;
  type_properties?: any;
  location_description?: any;
  location_type?: any;
}

export type LoadIndexAction =
  | { type: 'LOAD_INDEX_REQUEST' }
  | { type: 'LOAD_INDEX_SUCCESS'; incidents: IncidentData[] }
  | { type: 'LOAD_INDEX_FAILURE'; error: string };

export interface FilterIndexAction {
  type: 'FILTER_INDEX';
  filterBy: string;
}

// action creators
// load actions
export const loadIndex = () => {
  return (dispatch: Dispatch, getState: () => IState) => {
    const state = getState();
    const filterBy = getSearchText(state);
    dispatch(loadIndexRequest());

    fetch(`${config.api}/incidents?proximity=berlin&query=${filterBy}`)
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
export function applyFilter(filterBy: string) {
  return (dispatch: Dispatch, getState: () => IState) => {
    dispatch({ type: 'FILTER_INDEX', filterBy });
    loadIndex()(dispatch, getState);
  };
}
