import React from "react";
//
import style from "./Pagination.module.css";

const Pagination = ({
  dogsPerPage,
  currentPage,
  setCurrentPage,
  totalDogs,
}) => {
  const pageNumbers = []; //Contiene todos los num de pagina.

  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1); //Nuevo estado, es la página actual menos uno.
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1); //Lo mismo pero sumando.
  };

  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <div className={style.pagDiv}>
      <button
        className={style.btnPrev}
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        PREVIOUS
      </button>
      <ul className={style.pages}>
        {pageNumbers.map((page) => {
          if (
            page === 1 ||
            page === 2 ||
            page === currentPage ||
            page === currentPage + 1 ||
            page === currentPage + 2 ||
            page === currentPage - 1 ||
            page === currentPage - 2 ||
            page === pageNumbers.length ||
            page === pageNumbers.length - 1
          ) {
            return (
              <li key={page} className={style.page}>
                <button
                  className={`${style.btnPage} ${
                    page === currentPage ? style.isCurrent : null
                  }`}
                  onClick={() => onSpecificPage(page)} //Como retornamos un parametro, necesitamos utilizar una callback.
                >
                  {page}
                </button>
              </li>
            );
          }
        })}
      </ul>
      <button
        className={style.btnNext}
        onClick={onNextPage}
        disabled={currentPage >= pageNumbers.length}
      >
        NEXT
      </button>
    </div>
  );
};

export default Pagination;
