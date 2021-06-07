import React from 'react';

import { Container } from './styles';

type PaginationProps = {
  handleFirstPage(e: number): void;
  handleLastPage: () => void;
  handlePaginate(e: number): void;
  currentPage: number;
  totalPages: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  handleFirstPage,
  handleLastPage,
  handlePaginate,
  currentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <Container>
      <span
        role="button"
        className="side-link"
        aria-hidden="true"
        onClick={() => handleFirstPage(0)}
      >
        FIRST
      </span>
      {currentPage - 3 > 0 && (
        <span
          role="button"
          aria-hidden="true"
          onClick={() => handlePaginate(currentPage - 3)}
        >
          {currentPage - 3}
        </span>
      )}
      {currentPage - 2 > 0 && (
        <span
          role="button"
          aria-hidden="true"
          onClick={() => handlePaginate(currentPage - 2)}
        >
          {currentPage - 2}
        </span>
      )}
      {currentPage - 1 > 0 && (
        <span
          role="button"
          aria-hidden="true"
          onClick={() => handlePaginate(currentPage - 1)}
        >
          {currentPage - 1}
        </span>
      )}
      <span
        role="button"
        aria-hidden="true"
        onClick={() => handlePaginate(currentPage)}
        className="selected"
      >
        {currentPage}
      </span>
      {currentPage + 1 <= totalPages && (
        <span
          role="button"
          aria-hidden="true"
          onClick={() => handlePaginate(currentPage + 1)}
        >
          {currentPage + 1}
        </span>
      )}
      {currentPage + 2 <= totalPages && (
        <span
          role="button"
          aria-hidden="true"
          onClick={() => handlePaginate(currentPage + 2)}
        >
          {currentPage + 2}
        </span>
      )}
      {currentPage + 3 <= totalPages && (
        <span
          role="button"
          aria-hidden="true"
          onClick={() => handlePaginate(currentPage + 3)}
        >
          {currentPage + 3}
        </span>
      )}
      <span
        className="side-link"
        role="button"
        aria-hidden="true"
        onClick={() => handleLastPage()}
      >
        LAST
      </span>
    </Container>
  );
};
