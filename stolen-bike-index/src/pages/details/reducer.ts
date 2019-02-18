import { DetailsState, LoadDetailsAction, ResetDetailsAction } from './model';

const initialState: DetailsState = {
  incident: null,
  isLoading: false,
  error: '',
};

export function indexReducer(state = initialState, action: LoadDetailsAction | ResetDetailsAction): DetailsState {
  switch (action.type) {
    case 'LOAD_DETAILS_REQUEST':
      return { ...state, incident: null, isLoading: true, error: '' };
    case 'LOAD_DETAILS_SUCCESS':
      return { ...state, isLoading: false, incident: action.incident };
    case 'LOAD_DETAILS_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    case 'RESET_DETAILS':
      return initialState;
    default:
      return state;
  }
}

export default indexReducer;
