import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "./TalkMain.css";
function Pag({ totalPages, currentPage, handlePageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <div
        key={i}
        className={`page-item ${i === currentPage ? "active" : ""}`}
        onClick={() => handlePageChange(i)}
      >
        <a className="page-link" href="#">
          {i}
        </a>
      </div>
    );
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">{pageNumbers}</ul>
    </nav>
  );
}

export default Pag;
