import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { loadTheftDetails } from './actions';
import { IState } from '../rootReducer';
import { getDetails, getLoading, getError } from './selectors';
import { IncidentData } from '../index/actions';
import ProcessingInfo from '../../components/ProcessingInfo';
import styled from 'styled-components';

interface DetailsProps {
  loadTheftDetails: (id: number) => void;
  details: IncidentData | null;
  match: match<{ id: string }>;
  isLoading: boolean;
  error: string;
}

const Updated = styled.div`
  text-align: right;
`;

class Details extends Component<DetailsProps> {
  componentDidMount() {
    this.props.loadTheftDetails(Number(this.props.match.params.id));
  }

  render() {
    const { details, isLoading, error } = this.props;
    if (!details) return <ProcessingInfo isLoading={isLoading} error={error} isEmptyData={!details} />;

    return (
      <React.Fragment>
        <h2>{details.title}</h2>
        <div>
          <strong>Stolen </strong>
          <span>
            {new Date(details.occurred_at).toDateString()}
            {Boolean(details.address) && ` - ${details.address}`}
          </span>
        </div>
        <h2>DESCRIPTION OF INCIDENT</h2>
        <p>{details.description}</p>
        <Updated>
          <strong>Updated:</strong> {new Date(details.updated_at).toDateString()}
        </Updated>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: IState) => ({
    details: getDetails(state),
    isLoading: getLoading(state),
    error: getError(state),
  }),
  {
    loadTheftDetails,
  }
)(Details);
