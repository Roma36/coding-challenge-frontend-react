import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar';
import { connect } from 'react-redux';

class Index extends Component {
  private executeSearch = (str: string) => {
    //
  };

  render() {
    return (
      <React.Fragment>
        <SearchBar onSearch={this.executeSearch} placeholder="Search case descriptions" />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {}
)(Index);
