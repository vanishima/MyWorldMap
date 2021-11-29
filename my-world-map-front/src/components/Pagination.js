import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <div onClick={() => paginate(number)} className="page-link">
            {number}
          </div>
        </li>
      ))}
    </nav>
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
