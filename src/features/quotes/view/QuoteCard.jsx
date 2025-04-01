import { useState } from "react";
import DeleteModal from "./sub-components/DeleteModal";
import ToggleImage from "./sub-components/ToggleImage";

export default function QuoteCard({ id, quote, setCurPage, curPage }) {
  const [note, setNote] = useState(null);
  const [modal, setModal] = useState();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(quote.quote);
      alert("Quote copied to clipboard!");
    } catch (error) {
      alert("Error copying.");
    }
  };

  return (
    <div
      key={quote.id}
      id={`quote_${id}`}
      className={`border border-gray-300 p-3 mb-4 flex relative max-sm:border-x-white max-sm:border-b-white max-sm:mb-0 ${
        id == 0 && "mt-4"
      }`}
    >
      <ToggleImage
        quote={quote}
        curPage={curPage}
        id={id}
        setModal={setModal}
      />

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-baseline flex-wrap">
            <p className="text-lg">{quote.title}</p>
            &nbsp;
            <p>by {quote.author}</p>
          </div>
          <button
            className="flex justify-center items-center hover:bg-blue-400 rounded-full ml-1 p-1 group"
            onClick={copyToClipboard}
          >
            <i className="fa-solid fa-share group-hover:text-white"></i>
          </button>
        </div>

        <hr className="border-gray-400 mb-3" />
        <p>"{quote.quote}"</p>
        {quote.page && <p>- Page {quote.page}</p>}

        {quote.note != "" &&
          (note === quote.id ? (
            <>
              <hr className="border-gray-400 mt-3 mb-2" />
              <div>{quote.note}</div>
              <button
                onClick={() => setNote(null)}
                className="gray-button rounded-md p-1 mt-2 text-sm"
              >
                Hide note
              </button>
            </>
          ) : (
            <button
              onClick={() => setNote(quote.id)}
              className="gray-button rounded-md p-1 mt-2 text-sm"
            >
              Show note
            </button>
          ))}
      </div>

      {modal === quote.id && (
        <DeleteModal
          setModal={setModal}
          id={quote.id}
          setCurPage={setCurPage}
          curPage={curPage}
        />
      )}
    </div>
  );
}
