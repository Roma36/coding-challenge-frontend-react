import React, { Component } from 'react';
import SearchBar from '../../components/SearchBar';

export default class Index extends Component {

  executeSearch = (str: string) => {
    return console.log(str);
  }

  render() {
    return (
      <div>
        <SearchBar
          onSearch={this.executeSearch}
          placeholder="Search case descriptions"
        />
      </div>
    )
  }
}
