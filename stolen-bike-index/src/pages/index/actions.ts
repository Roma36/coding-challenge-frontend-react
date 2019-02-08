import { getSearchText, getCurrentPage } from './selectors';
import { IState, ThunkResult, ThunkDispatch } from './../rootReducer';
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

export interface PaginateAction {
  type: 'PAGINATE';
  page: number;
}

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
