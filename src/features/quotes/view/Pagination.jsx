export default function Pagination({ curPage, setCurPage, maxPages }) {
  return (
    <div className="flex justify-between">
      {curPage !== 0 ? (
        <button onClick={() => setCurPage((prev) => prev - 1)} className="w-8 h-8">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      ) : (
        <div className="w-8 h-8"></div>
      )}

      <div className="flex justify-center">
        {[...Array(maxPages).keys()].map((page) => {
          if (page < 4 || page === maxPages - 1 || page === curPage) {
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
          }

          if (page === 4) {
            return (
              <p key={page} className="mr-2">
                ...
              </p>
            );
          }
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
