import { useContext, useEffect, useState } from "react";
import Pagination from "../features/quotes/view/Pagination";
import QuoteCard from "../features/quotes/view/QuoteCard";
import Context from "../context/ContextProvider";
import { PageContext } from "../App";
import Search from "../features/quotes/view/Search";
import { scrollPosition } from "../features/quotes/view/functions/scrollPosition";

export default function ViewQuotes({ page, id }) {
  const { userDoc } = useContext(Context);
  const { setPage, pages } = useContext(PageContext);
  const [quotes, setQuotes] = useState(userDoc.quotes);
  const [curPage, setCurPage] = useState(page);
  const [curItems, setCurItems] = useState([]);
  const [scrollCounter, setScrollCounter] = useState(false);
  const maxPages = Math.ceil(quotes.length / 10);

  //determines the current set of items for the current page
  useEffect(() => {
    const firstItem = curPage === 0 ? curPage : curPage * 10;
    const lastItem = curPage * 10 + 10;

    const curQuotes = quotes.slice(firstItem, lastItem);

    if (quotes != "no-results") {
      setCurItems(curQuotes);
    }
  }, [curPage, userDoc, quotes]);

  useEffect(() => {
    setQuotes(userDoc.quotes);
  }, [userDoc]);

  //scroll to last known position from edit or to last item from add
  useEffect(() => {
    const scroll = scrollPosition(
      id,
      curItems,
      scrollCounter,
      setScrollCounter
    );

    return scroll;
  }, [id, curItems, scrollCounter]);

  return (
    <>
      {quotes.length === 0 ? (
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
      ) : quotes === "no-results" ? (
        <div className="flex flex-col justify-center items-center ">
          <i className="fa-solid fa-face-frown-open text-gray-700 text-center text-2xl my-1"></i>
          <p className="text-center text-lg text-gray-700">No quotes found.</p>
          <button
            className="blue-button"
            onClick={() => setQuotes(userDoc.quotes)}
          >
            Go back
          </button>
        </div>
      ) : (
        <>
          <Search
            setQuotes={setQuotes}
            setCurPage={setCurPage}
            userDoc={userDoc}
          />

          <Pagination
            curPage={curPage}
            setCurPage={setCurPage}
            maxPages={maxPages}
          />

          {curItems.map((quote, idx) => (
            <QuoteCard
              key={quote.id}
              id={idx}
              quote={quote}
              setCurPage={setCurPage}
              curPage={curPage}
            />
          ))}

          <Pagination
            curPage={curPage}
            setCurPage={setCurPage}
            maxPages={maxPages}
          />
        </>
      )}
    </>
  );
}
