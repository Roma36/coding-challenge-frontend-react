import { LoadIndexAction, IncidentData } from './actions';

export interface IndexState {
  incidents: IncidentData[];
  isLoading: boolean;
  error: string;
}

const initialState: IndexState = {
  incidents: [],
  isLoading: false,
  error: '',
};

export function indexReducer(state = initialState, action: LoadIndexAction): IndexState {
  switch (action.type) {
    case 'LOAD_INDEX_REQUEST':
      return { ...state, isLoading: true, error: '' };
    case 'LOAD_INDEX_SUCCESS':
      return { ...state, isLoading: false, incidents: action.incidents || [] };
    case 'LOAD_INDEX_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

export default indexReducer;
