export interface IndexProps {
  loadIndex: () => void;
  applyFilter: (title: string) => void;
  paginate: (page: number) => void;
  totalCount: number;
  incidents: IncidentData[];
  isLoading: boolean;
  error: string;
  searchText: string;
  page: number;
}

export interface IndexState {
  incidents: IncidentData[];
  isLoading: boolean;
  error: string;
  filterBy: string;
  page: number;
}

export interface IncidentData {
  id: number;
  address: string;
  description: string | null;
  media: {
    image_url: string | null;
    image_url_thumb: string | null;
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
