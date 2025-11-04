import React from "react";

export const getPaginationButtons = (curPage, setCurPage, maxPages) => {
  const renderPageButton = (page) => (
    <button
      key={page}
      id={page}
      onClick={() => setCurPage(page)}
      className={`page-button ${page === curPage && "current-page"}`}
    >
      {page + 1}
    </button>
  );

  const renderDots = (key) => (
    <p key={key} className="mr-2">
      ...
    </p>
  );

  return [...Array(maxPages).keys()].map((page) => {
    //Case 1 (start): "1,2,3,4 ... last page"
    if (curPage < 3) {
      if (page < 3 || page === maxPages - 1) return renderPageButton(page);
      if (page === 4) return renderDots("start-dots");
    }

    //Case 2 (between): "1 ...  curPage-1, curPage, curPage+1 ... last page"
    if (curPage >= 3 && curPage < maxPages - 3) {
      //first and max page
      if (page === 0) {
        return [renderPageButton(page), renderDots("left-dots")];
      }

      if (page === maxPages - 1) return renderPageButton(page);
      if (page === curPage - 1 || page === curPage || page === curPage + 1) {
        return renderPageButton(page);
      }

      if (page === curPage + 2) return renderDots("right-dots");
    }

    //Case 3 (end): "1 ... maxPages-3, maxPages-2, maxPages-1"
    if (curPage >= maxPages - 3) {
      if (page === 0) return renderPageButton(page);
      if (page === maxPages - 4) return renderDots("end-dots");
      if (page >= maxPages - 3) return renderPageButton(page);
    }

    return null;
  });
};
