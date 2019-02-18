import { IncidentData } from './../index/model';
import { match } from 'react-router';

export interface DetailsProps {
  loadTheftDetails: (id: number) => void;
  resetDetails: () => void;
  details: IncidentData | null;
  match: match<{ id: string }>;
  isLoading: boolean;
  error: string;
}

export interface DetailsState {
  incident: IncidentData | null;
  isLoading: boolean;
  error: string;
}

export type LoadDetailsAction =
  | { type: 'LOAD_DETAILS_REQUEST' }
  | { type: 'LOAD_DETAILS_SUCCESS'; incident: IncidentData }
  | { type: 'LOAD_DETAILS_FAILURE'; error: string };

export interface ResetDetailsAction {
  type: 'RESET_DETAILS';
}
