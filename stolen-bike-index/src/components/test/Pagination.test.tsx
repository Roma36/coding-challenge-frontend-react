import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Pagination, { PageNumberButton, PaginationButton } from '../Pagination';

describe('<Pagination />', () => {
  const defaultProps = {
    currentPage: 1,
    perPage: 10,
    totalCount: 23,
    onPaginate: jest.fn(),
  };

  it('should render without crashes', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pagination currentPage={1} perPage={10} totalCount={20} onPaginate={jest.fn()} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render pagination numbers correctly', () => {
    const pagination = shallow(<Pagination {...defaultProps} />);
    const paginationNumbers = pagination.find(PageNumberButton);
    expect(paginationNumbers.length).toBe(3);

    paginationNumbers.forEach((button, idx) => {
      expect(button.text()).toEqual(String(idx + 1));
    });

    pagination.setProps({
      ...defaultProps,
      perPage: 10,
      totalCount: 10,
    });

    expect(pagination.find(PageNumberButton).length).toBe(0);

    pagination.setProps({
      ...defaultProps,
      perPage: 50,
      totalCount: 10,
    });

    expect(pagination.find(PageNumberButton).length).toBe(0);

    pagination.setProps({
      ...defaultProps,
      perPage: 10,
      totalCount: 60,
    });

    expect(pagination.find(PageNumberButton).length).toBe(6);
  });

  it('should render pagination buttons correctly', () => {
    const pagination = shallow(<Pagination {...defaultProps} />);
    const paginationButtons = pagination.find(PaginationButton);

    expect(paginationButtons.length).toBe(4);
  });

  it('should handle page number click', () => {
    const jestSpy = jest.fn();
    const pagination = shallow(<Pagination {...defaultProps} onPaginate={jestSpy} />);
    const paginationNumbers = pagination.find(PageNumberButton);

    paginationNumbers.slice(1).forEach(button => {
      button.simulate('click');
      expect(jestSpy).toBeCalledWith(Number(button.text()));
    });
  });

  it('should not handle page number click if current page is clicked', () => {
    const jestSpy = jest.fn();
    const pagination = shallow(<Pagination {...defaultProps} onPaginate={jestSpy} />);
    const paginationNumbers = pagination.find(PageNumberButton);

    paginationNumbers.at(0).simulate('click');
    expect(jestSpy).not.toBeCalled();
  });

  it('should handle << First pagination button click', () => {
    const jestSpy = jest.fn();
    const pagination = shallow(<Pagination {...defaultProps} currentPage={3} onPaginate={jestSpy} />);
    const paginationButtons = pagination.find(PaginationButton);

    paginationButtons.at(0).simulate('click');
    expect(jestSpy).toBeCalledWith(1);
  });

  it('should handle < Prev pagination button click', () => {
    const jestSpy = jest.fn();
    const pagination = shallow(<Pagination {...defaultProps} currentPage={3} onPaginate={jestSpy} />);
    const paginationButtons = pagination.find(PaginationButton);

    paginationButtons.at(1).simulate('click');
    expect(jestSpy).toBeCalledWith(2);
  });

  it('should not handle << First and < Prev pagination buttons click if current page is first page', () => {
    const jestSpy = jest.fn();
    const pagination = shallow(<Pagination {...defaultProps} currentPage={1} onPaginate={jestSpy} />);
    const paginationButtons = pagination.find(PaginationButton);

    paginationButtons.at(0).simulate('click');
    expect(jestSpy).not.toBeCalled();

    paginationButtons.at(1).simulate('click');
    expect(jestSpy).not.toBeCalled();
  });

  it('should handle Next > pagination button click', () => {
    const jestSpy = jest.fn();
    const pagination = shallow(<Pagination {...defaultProps} currentPage={1} onPaginate={jestSpy} />);
    const paginationButtons = pagination.find(PaginationButton);

    paginationButtons.at(2).simulate('click');
    expect(jestSpy).toBeCalledWith(2);
  });

  it('should handle Last >> pagination button click', () => {
    const jestSpy = jest.fn();
    const pagination = shallow(<Pagination {...defaultProps} currentPage={1} onPaginate={jestSpy} />);
    const paginationButtons = pagination.find(PaginationButton);

    paginationButtons.at(3).simulate('click');
    expect(jestSpy).toBeCalledWith(3);
  });

  it('should not handle Next > and Last >> pagination buttons click if current page is last page', () => {
    const jestSpy = jest.fn();
    const pagination = shallow(<Pagination {...defaultProps} currentPage={3} onPaginate={jestSpy} />);
    const paginationButtons = pagination.find(PaginationButton);

    paginationButtons.at(2).simulate('click');
    expect(jestSpy).not.toBeCalled();
    paginationButtons.at(3).simulate('click');
    expect(jestSpy).not.toBeCalled();
  });
});
