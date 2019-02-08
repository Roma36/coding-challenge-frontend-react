import React, { Component } from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { loadTheftDetails } from './actions';
import { IState } from '../rootReducer';
import { getDetails } from './selectors';
import { IncidentData } from '../index/actions';
interface DetailsProps {
  loadTheftDetails: (id: number) => void;
  details: IncidentData | null;
  match: match<{ id: string }>;
}

class Details extends Component<DetailsProps> {
  componentDidMount() {
    this.props.loadTheftDetails(Number(this.props.match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <h1>Title</h1>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: IState) => ({
    details: getDetails(state),
  }),
  {
    loadTheftDetails,
  }
)(Details);
