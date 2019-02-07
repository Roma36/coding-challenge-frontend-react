import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar';
import { connect } from 'react-redux';
import { loadIndex, IncidentData, applyFilter } from './actions';
import styled from 'styled-components';
import { getIncidents, getTotalCount, getLoading, getError, getSearchText } from './selectors';
import { IState } from '../rootReducer';
import IncidentItem from '../../components/IncidentItem';
import Error from '../../components/Error';

const TotalCount = styled.div`
  text-align: right;
  margin-bottom: 20px;
`;

const Search = styled(SearchBar)`
  margin-bottom: 20px;
`;

interface IndexProps {
  loadIndex: () => void;
  applyFilter: (title: string) => void;
  totalCount: number;
  incidents: IncidentData[];
  isLoading: boolean;
  error: string;
  searchText: string;
}

class Index extends Component<IndexProps> {
  componentDidMount() {
    if (!this.props.incidents.length) {
      this.props.loadIndex();
    }
  }

  private searchIncidents = (str: string) => {
    this.props.applyFilter(str);
  };

  render() {
    const { totalCount, incidents, isLoading, error, searchText } = this.props;
    return (
      <React.Fragment>
        <Search
          disabled={isLoading}
          searchValue={searchText}
          onSearch={this.searchIncidents}
          placeholder="Search case descriptions"
        />

        {Boolean(totalCount) && <TotalCount>total: {totalCount}</TotalCount>}

        {isLoading && 'Loading...'}

        {!error && !isLoading && incidents.length === 0 && 'No Results'}

        {Boolean(error) && <Error>{'Ooops, something went wrong'}</Error>}

        {incidents.map(incident => (
          <IncidentItem
            key={incident.id}
            imageUrl={incident.media.image_url_thumb}
            title={incident.title}
            link={`/case/${incident.id}`}
            location={incident.address}
            description={incident.description}
            theftDate={new Date(incident.occurred_at)}
            reportDate={new Date(incident.updated_at)}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default connect(
  (state: IState) => ({
    isLoading: getLoading(state),
    incidents: getIncidents(state),
    totalCount: getTotalCount(state),
    error: getError(state),
    searchText: getSearchText(state),
  }),
  { loadIndex, applyFilter }
)(Index);
