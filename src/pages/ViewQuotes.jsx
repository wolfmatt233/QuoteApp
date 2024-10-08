import { useContext, useEffect, useState } from "react";
import Context from "../context/ContextProvider";
import Pagination from "./components/quotes/Pagination";
import DeleteModal from "./components/quotes/DeleteModal";
import { PageContext } from "../App";
import BookImage from "./components/quotes/BookImage";

export default function ViewQuotes() {
  const { userDoc } = useContext(Context);
  const { setPage, pages } = useContext(PageContext);
  const [curPage, setCurPage] = useState(0);
  const [curItems, setCurItems] = useState([]);
  const maxPages = Math.ceil(userDoc.quotes.length / 10);
  const [note, setNote] = useState(null);
  const [deleteModal, setDeleteModal] = useState();

  useEffect(() => {
    const firstItem = curPage === 0 ? curPage : curPage * 10;
    const lastItem = curPage * 10 + 10;
    const curQuotes = userDoc.quotes.slice(firstItem, lastItem);
    setCurItems(curQuotes);
  }, [curPage, userDoc]);

  return (
    <>
      {userDoc.quotes.length > 0 && (
        <Pagination
          curPage={curPage}
          setCurPage={setCurPage}
          maxPages={maxPages}
        />
      )}

      {userDoc.quotes.length === 0 && (
        <>
          <p className="text-center text-lg mb-2">
            No quotes here yet, add some!
          </p>
          <button
            className="text-center blue-button w-full"
            onClick={() => setPage(pages.add)}
          >
            Add a quote!
          </button>
        </>
      )}

      {curItems.map((quote) => (
        <div
          key={quote.id}
          className="border border-gray-300 p-3 mb-3 flex relative"
        >
          <BookImage
            quote={quote}
            setPage={setPage}
            setDeleteModal={setDeleteModal}
          />

          <div className="w-full">
            <div className="flex items-baseline flex-wrap">
              <p className="text-lg">{quote.title}</p>
              &nbsp;
              <p>by {quote.author}</p>
            </div>
            <hr className="border-gray-400 mb-3" />
            <p>"{quote.quote}"</p>
            {quote.page && <p>- Page {quote.page}</p>}
            {note === quote.id && (
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
            )}
            {quote.note && note === null && (
              <button
                onClick={() => setNote(quote.id)}
                className="gray-button rounded-md p-1 mt-2 text-sm"
              >
                Show note
              </button>
            )}
          </div>

          <DeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            quote={quote}
            userDoc={userDoc}
            setCurPage={setCurPage}
          />
        </div>
      ))}

      {userDoc.quotes.length > 0 && (
        <Pagination
          curPage={curPage}
          setCurPage={setCurPage}
          maxPages={maxPages}
        />
      )}
    </>
  );
}
