import { ITEMS_PER_PAGE } from './constants';
import { createSelector } from 'reselect';
import { IState } from './../rootReducer';

export const getIncidents = (state: IState) => state.index.incidents;
export const getLoading = (state: IState) => state.index.isLoading;
export const getError = (state: IState) => state.index.error;
export const getSearchText = (state: IState) => state.index.filterBy;
export const getCurrentPage = (state: IState) => state.index.page;

export const getTotalCount = createSelector(
  getIncidents,
  incidents => incidents.length
);

export const getVisibleIncidents = createSelector(
  getIncidents,
  getCurrentPage,
  (incidents, currentPage) => incidents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
);
