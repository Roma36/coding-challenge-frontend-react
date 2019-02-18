import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadIndex, applyFilter, paginate } from './actions';
import { getVisibleIncidents, getTotalCount, getLoading, getError, getSearchText, getCurrentPage } from './selectors';
import { IState } from '../rootReducer';
import IncidentItem from '../../components/IncidentItem';
import { ITEMS_PER_PAGE } from './constants';
import Pagination from '../../components/Pagination';
import ProcessingInfo from '../../components/ProcessingInfo';
import { IndexProps } from './model';
import { Search, TotalCount } from './components';

export class Index extends Component<IndexProps> {
  componentDidMount() {
    if (!this.props.incidents.length) {
      this.props.loadIndex();
    }
  }

  private searchIncidents = (str: string) => {
    this.props.applyFilter(str);
  };

  private handlePaginate = (page: number) => {
    this.props.paginate(page);
  };

  render() {
    const { page, totalCount, incidents, isLoading, error, searchText } = this.props;
    return (
      <React.Fragment>
        <Search
          disabled={isLoading}
          searchValue={searchText}
          onSearch={this.searchIncidents}
          placeholder="Search case descriptions"
        />

        {!isLoading && Boolean(totalCount) && <TotalCount>total: {totalCount}</TotalCount>}

        <ProcessingInfo isLoading={isLoading} error={error} isEmptyData={incidents.length === 0} />

        {incidents.map(incident => (
          <IncidentItem
            key={incident.id}
            imageUrl={incident.media.image_url_thumb || ''}
            title={incident.title}
            link={`/case/${incident.id}`}
            location={incident.address}
            description={incident.description || ''}
            theftDate={new Date(incident.occurred_at)}
            reportDate={new Date(incident.updated_at)}
          />
        ))}
        {Boolean(totalCount) && totalCount > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={page}
            perPage={ITEMS_PER_PAGE}
            totalCount={totalCount}
            onPaginate={this.handlePaginate}
          />
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  (state: IState) => ({
    isLoading: getLoading(state),
    incidents: getVisibleIncidents(state),
    totalCount: getTotalCount(state),
    error: getError(state),
    searchText: getSearchText(state),
    page: getCurrentPage(state),
  }),
  { loadIndex, applyFilter, paginate }
)(Index);
