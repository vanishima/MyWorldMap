import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination left none-list">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <div onClick={() => paginate(number)} className="page-link">
              {number}
            </div>
          </li>
        ))}
    </ul>  
  );
};

Pagination.propTypes = {
  props: PropTypes.shape({
    postsPerPage: PropTypes.number,
    totalPosts: PropTypes.number,
    paginate: PropTypes.func,
  }),
};

export default Pagination;
