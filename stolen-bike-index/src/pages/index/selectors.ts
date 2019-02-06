import { IState } from './../rootReducer';

export const getIncidents = (state: IState) => state.index.incidents;
export const getTotalCount = (state: IState) => state.index.incidents && state.index.incidents.length;
export const getLoading = (state: IState) => state.index.isLoading;
export const getError = (state: IState) => state.index.error;
