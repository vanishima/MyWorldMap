import React from "react";
import PropTypes from "prop-types";
import { usePagination, DOTS } from "./usePagination";
import "../stylesheets/pagination.css";

const Pagination = ({
  pageSize,
  totalCount,
  paginate,
  currentPage,
  siblingCount = 1,
}) => {
  const pageNumbers = [];
  const totalPageCount = Math.ceil(totalCount / pageSize);
  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  console.log("paginationRange", paginationRange);

  const onNext = () => {
    paginate(currentPage + 1);
  };

  const onPrevious = () => {
    paginate(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination-container">
      {/* left pagination arrow */}
      {currentPage === 1 ? (
        <li className="pagination-item">
          <div className="arrow left disabled"></div>
        </li>
      ) : (
        <li className="pagination-item" onClick={onPrevious}>
          <div className="arrow left"></div>
        </li>
      )}

      {paginationRange.map((pageNumber, i) => {
        // if the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={i}>&#8230;</li>;
        }

        // Render our Page Pills
        if (pageNumber === currentPage) {
          return (
            <li
              className="pagination-item selected"
              key={i}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        } else {
          return (
            <li
              className="pagination-item"
              key={i}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        }
      })}

      {/* right navigation arrow*/}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
      >
        <div className="arrow right"></div>
      </li>
    </ul>
  );

  // return (
  //   <ul className="pagination left none-list">
  //     {pageNumbers.map((number) => (
  //       <li key={number} className="page-item">
  //         <div onClick={() => paginate(number)} className="page-link">
  //           {number}
  //         </div>
  //       </li>
  //     ))}
  //   </ul>
  // );
};

Pagination.propTypes = {
  props: PropTypes.shape({
    pageSize: PropTypes.number,
    totalCount: PropTypes.number,
    paginate: PropTypes.func,
    currentPage: PropTypes.number,
    siblingCount: PropTypes.number,
  }),
};

export default Pagination;
