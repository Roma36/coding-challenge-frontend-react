import React from 'react';
import { Index } from '../Index';
import { mount, ReactWrapper } from 'enzyme';
import SearchBar from '../../../components/SearchBar';
import mockIncidents from './incidents.mock.json';
import { IndexProps } from '../model';
import Pagination, { PageNumberButton } from '../../../components/Pagination';
import IncidentItem from '../../../components/IncidentItem';
import { shape } from 'prop-types';
import ProcessingInfo from '../../../components/ProcessingInfo';

const options = {
  context: {
    router: {
      history: {
        push: jest.fn(),
        replace: jest.fn(),
        createHref: jest.fn(),
      },
    },
  },
  childContextTypes: {
    router: shape({}),
  },
};

describe('<Index >', () => {
  const props: IndexProps = {
    loadIndex: jest.fn(),
    applyFilter: jest.fn(),
    paginate: jest.fn(),
    totalCount: 0,
    incidents: [],
    isLoading: false,
    error: '',
    searchText: '',
    page: 1,
  };

  let wrapper: ReactWrapper<IndexProps>;

  beforeEach(() => {
    wrapper = mount(<Index {...props} />, options);
  });

  it('should render the <Search > component', () => {
    expect(wrapper.find(SearchBar).length).toEqual(1);
  });

  it('should load incidents', () => {
    expect(wrapper.props().loadIndex).toHaveBeenCalled();
  });

  it('should render ProcessingInfo block', () => {
    expect(wrapper.find(ProcessingInfo).length).toBe(1);
  });

  it('should render pagination', () => {
    wrapper.setProps({
      totalCount: 23,
    });

    expect(wrapper.find(Pagination).length).toBe(1);
  });

  it('should render IncidentItems', () => {
    wrapper.setProps({
      incidents: mockIncidents.incidents,
    });

    expect(wrapper.find(IncidentItem).length).toBe(23);
  });

  it('should apply filters on search button click', () => {
    wrapper
      .find(SearchBar)
      .find('input')
      .simulate('change', { target: { value: 'Changed' } });
    wrapper
      .find(SearchBar)
      .find('button')
      .simulate('click');
    expect(wrapper.props().applyFilter).toHaveBeenCalledWith('Changed');
  });

  it('should call paginate if pagination button clicked', () => {
    wrapper.setProps({
      page: 1,
      totalCount: 20,
    });

    wrapper
      .find(PageNumberButton)
      .at(1)
      .simulate('click');
    expect(wrapper.props().paginate).toHaveBeenCalledWith(2);
  });
});
