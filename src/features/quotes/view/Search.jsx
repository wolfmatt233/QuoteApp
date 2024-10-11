import { useState } from "react";

export default function Search({ setQuotes, setCurPage, userDoc }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (query === "") {
      setCurPage(0);
      setQuotes(userDoc.quotes);
      return;
    }

    let newQuotes = userDoc.quotes.filter((quote) => {
      if (quote.title.toLowerCase().indexOf(query) >= 0) {
        return quote;
      }

      if (quote.author.toLowerCase().indexOf(query) >= 0) {
        return quote;
      }

      if (quote.quote.toLowerCase().indexOf(query) >= 0) {
        return quote;
      }

      if (quote.note.toLowerCase().indexOf(query) >= 0) {
        return quote;
      }

      if (quote.page.toLowerCase().indexOf(query) >= 0) {
        return quote;
      }
    });

    if (newQuotes.length === 0) {
      setQuotes("no-results");
    } else {
      setCurPage(0);
      setQuotes(newQuotes);
    }
  };

  return (
    <>
      <form className="flex mb-4">
        <input
          type="text"
          name="q"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full mb-0 basic-input p-2 rounded-l-xl"
        />
        <button
          className="px-4 border border-gray-300 border-l-0 rounded-r-xl"
          onClick={handleSearch}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </>
  );
}
