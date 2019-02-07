import { LoadIndexAction, IncidentData, FilterIndexAction, PaginateAction } from './actions';

export interface IndexState {
  incidents: IncidentData[];
  isLoading: boolean;
  error: string;
  filterBy: string;
  page: number;
}

const initialState: IndexState = {
  incidents: [],
  isLoading: false,
  error: '',
  filterBy: '',
  page: 1,
};

export function indexReducer(
  state = initialState,
  action: LoadIndexAction | FilterIndexAction | PaginateAction
): IndexState {
  switch (action.type) {
    case 'LOAD_INDEX_REQUEST':
      return { ...state, incidents: [], isLoading: true, error: '' };
    case 'LOAD_INDEX_SUCCESS':
      return { ...state, isLoading: false, incidents: action.incidents || [] };
    case 'LOAD_INDEX_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    case 'FILTER_INDEX':
      return { ...state, filterBy: action.filterBy };
    case 'PAGINATE':
      return { ...state, page: action.page };
    default:
      return state;
  }
}

export default indexReducer;
