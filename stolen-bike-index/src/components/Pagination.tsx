import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const PaginationWrapper = styled.div`
  display: flex;

  & > :not(:first-child) {
    margin-left: 15px;
  }
`;

interface PageButtonProps {
  selected: boolean;
}

export const PageNumberButton = styled(Button)`
  ${(props: PageButtonProps) => (props.selected ? `box-shadow: 0 0;` : '')}
  width: 50px;
`;

export const PaginationButton = styled(Button)`
  width: 120px;
`;

interface PaginationProps {
  currentPage: number;
  perPage: number;
  totalCount: number;
  onPaginate: (page: number) => void;
}

export default function Pagination({ currentPage, perPage, totalCount, onPaginate }: PaginationProps) {
  const numberOfPages = Math.ceil(totalCount / perPage);

  if (numberOfPages <= 1) {
    return null;
  }

  const handlePaginate = (page: number) => {
    if (page !== currentPage) {
      onPaginate(page);
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPaginate(1);
    }
  };
  const handleLastPage = () => {
    if (currentPage !== numberOfPages) {
      onPaginate(numberOfPages);
    }
  };
  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      onPaginate(prevPage);
    }
  };
  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= numberOfPages) {
      onPaginate(nextPage);
    }
  };

  const pagesArr = new Array(numberOfPages).fill(null);

  return (
    <PaginationWrapper>
      <PaginationButton onClick={handleFirstPage}>{'<< First'}</PaginationButton>
      <PaginationButton onClick={handlePrevPage}>{'< Prev'}</PaginationButton>
      {pagesArr.map((_, index) => {
        const page = index + 1;

        return (
          <PageNumberButton selected={page === currentPage} onClick={handlePaginate.bind(null, page)} key={page}>
            {page}
          </PageNumberButton>
        );
      })}
      <PaginationButton onClick={handleNextPage}>{'Next >'}</PaginationButton>
      <PaginationButton onClick={handleLastPage}>{'Last >>'}</PaginationButton>
    </PaginationWrapper>
  );
}
