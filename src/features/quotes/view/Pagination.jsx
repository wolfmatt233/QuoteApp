export default function Pagination({ curPage, setCurPage, maxPages }) {
  return (
    <div className="flex justify-between">
      {curPage !== 0 ? (
        <button
          onClick={() => setCurPage((prev) => prev - 1)}
          className="w-8 h-8"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      ) : (
        <div className="w-8 h-8"></div>
      )}

      <div className="flex justify-center">
        {[...Array(maxPages).keys()].map((page) => {
          // If the current page is less than 4 show
          // "1,2,3,4 ... last page"
          if (curPage < 4) {
            if (page < 4 || page === maxPages - 1) {
              return (
                <button
                  key={page}
                  onClick={() => setCurPage(page)}
                  className={`border hover:bg-blue-400 hover:text-white w-8 h-8 flex items-center justify-center mr-2 ${
                    page === curPage && "bg-blue-500 text-white border-none"
                  }`}
                >
                  {page + 1}
                </button>
              );
            } else if (page === 4) {
              return (
                <p key={"dots"} className="mr-2">
                  ...
                </p>
              );
            }
          }

          // if the current page is greater than or equal to 4 show
          // "first page ...  curPage-1, curPage, curPage+1 ... last page"
          if (curPage >= 4 && curPage < maxPages - 3) {
            //first and max page
            if (page === 0 || page === maxPages - 1) {
              return (
                <>
                  <button
                    key={page}
                    onClick={() => setCurPage(page)}
                    className="border hover:bg-blue-400 hover:text-white w-8 h-8 flex items-center justify-center mr-2"
                  >
                    {page + 1}
                  </button>
                  {page === 0 && (
                    <p key={"dots-0"} className="mr-2">
                      ...
                    </p>
                  )}
                </>
              );
            } else if (
              page === curPage - 1 ||
              page === curPage ||
              page === curPage + 1
            ) {
              return (
                <button
                  key={page}
                  id={page}
                  onClick={() => setCurPage(page)}
                  className={`border hover:bg-blue-400 hover:text-white w-8 h-8 flex items-center justify-center mr-2 ${
                    page === curPage && "bg-blue-500 text-white border-none"
                  }`}
                >
                  {page + 1}
                </button>
              );
            } else if (page === curPage + 2) {
              return (
                <p key={"dots"} className="mr-2">
                  ...
                </p>
              );
            }
          }

          // if the current page is within 3 pages of the last page show
          // "first page ... maxPages-3, maxPages-2, maxPages-1"
          // where maxPages is the length and requires a subtraction to equal the array number
          if (curPage >= maxPages - 3) {
            if (page === 0 || page >= maxPages - 3) {
              return (
                <>
                  <button
                    key={page}
                    onClick={() => setCurPage(page)}
                    className={`border hover:bg-blue-400 hover:text-white w-8 h-8 flex items-center justify-center mr-2 ${
                      page === curPage && "bg-blue-500 text-white border-none"
                    }`}
                  >
                    {page + 1}
                  </button>
                </>
              );
            } else if (page === maxPages - 4) {
              return (
                <p key={"dots"} className="mr-2">
                  ...
                </p>
              );
            }
          }

          return null;
        })}
      </div>

      {curPage !== maxPages - 1 ? (
        <button
          onClick={() => setCurPage((prev) => prev + 1)}
          className="w-8 h-8"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      ) : (
        <div className="w-8 h-8"></div>
      )}
    </div>
  );
}
