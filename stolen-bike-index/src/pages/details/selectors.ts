import { IState } from './../rootReducer';

export const getDetails = (state: IState) => state.details.incident;
export const getLoading = (state: IState) => state.details.isLoading;
export const getError = (state: IState) => state.details.error;
