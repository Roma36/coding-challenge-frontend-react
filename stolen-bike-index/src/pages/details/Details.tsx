import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTheftDetails, resetDetails } from './actions';
import { IState } from '../rootReducer';
import { getDetails, getLoading, getError } from './selectors';
import ProcessingInfo from '../../components/ProcessingInfo';
import Map from '../../components/Map';
import { Title, Stolen, Updated } from './components';
import { DetailsProps } from './model';

export class Details extends Component<DetailsProps> {
  componentDidMount() {
    this.props.loadTheftDetails(Number(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.resetDetails();
  }

  render() {
    const { details, isLoading, error } = this.props;
    if (!details) return <ProcessingInfo isLoading={isLoading} error={error} isEmptyData={!details} />;

    return (
      Boolean(details) && (
        <React.Fragment>
          <Title>{details.title}</Title>
          <Stolen>
            <strong>Stolen </strong>
            <span>
              {new Date(details.occurred_at).toDateString()}
              {Boolean(details.address) && ` - ${details.address}`}
            </span>
          </Stolen>
          <Map address={details.address} />
          <h2>DESCRIPTION OF INCIDENT</h2>
          <p>{details.description}</p>
          <Updated>
            <strong>Updated:</strong> {new Date(details.updated_at).toDateString()}
          </Updated>
        </React.Fragment>
      )
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
    resetDetails,
  }
)(Details);
