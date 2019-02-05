import { LoadIndexAction } from './actions';

interface IndexState {
  items: object[];
  isLoading: boolean;
  error: string;
}

const initialState: IndexState = {
  items: [],
  isLoading: false,
  error: '',
};

export function indexReducer(state = initialState, action: LoadIndexAction): IndexState {
  switch (action.type) {
    case 'LOAD_INDEX_REQUEST':
      return { ...state, isLoading: true };
    case 'LOAD_INDEX_SUCCESS':
      return { ...state, isLoading: false, items: action.items };
    case 'LOAD_INDEX_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

export default indexReducer;
