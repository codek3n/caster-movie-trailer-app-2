import React from 'react';
import { MdOutlineNavigateNext } from 'react-icons/md';
import './pagination.scss';


const Pagination = ({ pageNumber, setPageNumber, totalPage }) => {

  const NextPage = () => {
    setPageNumber(c => c + 1)

    if (totalPage === pageNumber) {
      setPageNumber(totalPage)
    }
  }

  const PrevPage = () => {
    setPageNumber(c => c - 1)

    if (pageNumber === 1) {
      setPageNumber(1)
    }
  }

  return (
    <div className="pagination">

      <button className="pagination__btn--prev" onClick={() => PrevPage()}>
        < MdOutlineNavigateNext className="pagination__icon prev--icon" />
      </button>

      <div className="pagination__page-number">
        <div className="pagination__current-page">
          {pageNumber}
        </div>

        <p className="pagination__page-number--of">{`of ${totalPage}`}</p>

      </div>

      <button className="pagination__btn--next" onClick={() => NextPage()}>
        < MdOutlineNavigateNext className="pagination__icon" />
      </button>
    </div>
  )
}

export default Pagination