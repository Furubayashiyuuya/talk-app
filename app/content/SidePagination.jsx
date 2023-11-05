import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
function SidePagination({ totalPageCount, currentPage, handlePageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(
      <div
        key={i}
        className={`page-item ${i === currentPage ? "active" : ""}`}
        onClick={() => handlePageChange(i)}
      >
        <a className="page-link">{i}</a>
      </div>,
    );
  }

  return (
    <nav>
      <ul className="side-pagination ">{pageNumbers}</ul>
    </nav>
  );
}

export default SidePagination;
