import React, { useState } from "react";
import "./pagination.css";
interface PaginationTypes {
  imgPerPage: number;
  totalImgs: number;
  paginate: (number: number) => void;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  imgPerPage,
  totalImgs,
  paginate,
  active,
  setActive,
}: PaginationTypes) => {
  const [page, setPage] = useState<number>(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalImgs / imgPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="arrow">
        <button
          onClick={() => {
            setPage((prev) => {
              return prev <= 1 ? 1 : prev - 1;
            });

            paginate(page);
            setActive(page);
          }}
          className="arrow__button"
        >
          &lt;
        </button>
        <p>{page}</p>
        <button
          onClick={() => {
            setPage((prev) => {
              return prev == pageNumbers.length ? pageNumbers.length : prev + 1;
            });

            paginate(page);
            setActive(page);
          }}
          className="arrow__button"
        >
          &gt;
        </button>
      </div>
      <nav className="pagination">
        <ul className="pagination__list">
          {pageNumbers.map((item) => {
            return (
              <li
                key={item}
                className={
                  active === item
                    ? "pageItem pagination__list-active "
                    : "none pageItem"
                }
              >
                <p
                  onClick={() => {
                    paginate(item);
                    setActive(item);
                  }}
                  className="pageLink"
                >
                  {item}
                </p>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
