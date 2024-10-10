import { useContext, useEffect, useState } from "react";
import Pagination from "../features/quotes/view/Pagination";
import QuoteCard from "../features/quotes/view/QuoteCard";
import Context from "../context/ContextProvider";
import { PageContext } from "../App";

export default function ViewQuotes({ page, id }) {
  const { userDoc } = useContext(Context);
  const { setPage, pages } = useContext(PageContext);
  const [curPage, setCurPage] = useState(page);
  const [curItems, setCurItems] = useState([]);
  const [scrollCounter, setScrollCounter] = useState(false);
  const maxPages = Math.ceil(userDoc.quotes.length / 10);

  useEffect(() => {
    const firstItem = curPage === 0 ? curPage : curPage * 10;
    const lastItem = curPage * 10 + 10;
    const curQuotes = userDoc.quotes.slice(firstItem, lastItem);
    setCurItems(curQuotes);
  }, [curPage, userDoc]);

  useEffect(() => {
    if (scrollCounter === false && id && curItems.length > 0) {
      const element = document.getElementById(
        id == "last" ? curItems.length - 1 : id - 1
      );

      //scroll to and focus on an element (last if coming from add, previous if coming from edit)
      const focus = setTimeout(() => {
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      return () => {
        clearTimeout(focus);
        setScrollCounter(true);
      };
    }
  }, [id, curItems, scrollCounter]);

  return (
    <>
      {userDoc.quotes.length > 0 && (
        <Pagination
          curPage={curPage}
          setCurPage={setCurPage}
          maxPages={maxPages}
        />
      )}

      {userDoc.quotes.length === 0 ? (
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
      ) : (
        curItems.map((quote, idx) => (
          <QuoteCard
            key={quote.id}
            id={idx}
            quote={quote}
            userDoc={userDoc}
            setCurPage={setCurPage}
            curPage={curPage}
          />
        ))
      )}

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
