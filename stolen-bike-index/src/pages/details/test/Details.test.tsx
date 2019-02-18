import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Details } from '../Details';
import { DetailsProps } from '../model';
import Map from '../../../components/Map';
import detailsMock from './details.mock.json';
import ProcessingInfo from '../../../components/ProcessingInfo';

describe('<Details >', () => {
  const props: DetailsProps = {
    loadTheftDetails: jest.fn(),
    resetDetails: jest.fn(),
    details: detailsMock.incident,
    match: { params: { id: '1' } } as any,
    isLoading: false,
    error: '',
  };

  let wrapper: ReactWrapper<DetailsProps>;

  beforeEach(() => {
    wrapper = mount(<Details {...props} />);
  });

  it('should load theft details on component mount', () => {
    expect(wrapper.props().loadTheftDetails).toHaveBeenCalledWith(1);
  });

  it('should reset details on unmount', () => {
    (wrapper as any).instance().componentWillUnmount();
    expect(wrapper.props().resetDetails).toHaveBeenCalled();
  });

  it('should render Map component if details are present', () => {
    expect(wrapper.find(Map).length).toBe(1);
  });

  it('should show processing info only if no Details', () => {
    wrapper.setProps({ details: null });
    expect(wrapper.find(ProcessingInfo).length).toBe(1);
    wrapper.setProps({ details: detailsMock.incident });
    expect(wrapper.find(ProcessingInfo).length).toBe(0);
  });
});
