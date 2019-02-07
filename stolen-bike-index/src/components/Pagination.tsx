import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  height: 30px;
`;

interface PaginationProps {
  currentPage: number;
  perPage: number;
  totalCount: number;
  onPaginate: (page: number) => void;
}

export default function Pagination({ currentPage, perPage, totalCount, onPaginate }: PaginationProps) {
  const numberOfPages = Math.floor(totalCount / perPage) + 1;

  const handlePaginate = (page: number) => {
    onPaginate(page);
  };

  const pagesArr = new Array(numberOfPages).fill(null);

  return (
    <PaginationWrapper>
      <ul>
        {pagesArr.map((_, index) => {
          const page = index + 1;

          return (
            <li
              style={{ color: `${page === currentPage ? 'red' : 'black'}` }}
              onClick={handlePaginate.bind(null, page)}
              key={page}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </PaginationWrapper>
  );
}
