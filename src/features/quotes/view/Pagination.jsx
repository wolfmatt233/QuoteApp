import { getPaginationButtons } from "./functions/getPaginationButtons";

export default function Pagination({ curPage, setCurPage, maxPages }) {
  return (
    <div className="flex justify-between">
      {curPage !== 0 ? (
        <button
          onClick={() => setCurPage((prev) => prev - 1)}
          className="w-8 h-8 max-sm:ml-2"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      ) : (
        <div className="w-8 h-8"></div>
      )}

      <div className="flex justify-center">
        {getPaginationButtons(curPage, setCurPage, maxPages)}
      </div>

      {curPage !== maxPages - 1 ? (
        <button
          onClick={() => setCurPage((prev) => prev + 1)}
          className="w-8 h-8 max-sm:mr-2"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      ) : (
        <div className="w-8 h-8"></div>
      )}
    </div>
  );
}
