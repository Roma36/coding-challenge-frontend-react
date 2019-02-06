import { createSelector } from 'reselect';
import { IState } from './../rootReducer';

const incidentsSelector = (state: IState) => state.index.incidents;
const filerBySelectror = (state: IState) => state.index.filterBy;

export const getIncidents = createSelector(
  incidentsSelector,
  filerBySelectror,
  (incidents, filterBy) => {
    if (!filterBy) return incidents;

    return incidents.filter(incident => incident.title.toLowerCase().includes(filterBy.toLowerCase()));
  }
);
export const getTotalCount = createSelector(
  getIncidents,
  incidents => incidents.length
);
export const getLoading = (state: IState) => state.index.isLoading;
export const getError = (state: IState) => state.index.error;
