import { useState } from "react";

export default function SearchSort({ setQuotes, setCurPage, userDoc, quotes }) {
  const [originalQuotes] = useState([...userDoc.quotes]);
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("oldest");

  const handleSearch = (e) => {
    e.preventDefault();

    if (query === "") {
      setCurPage(0);
      setQuotes(userDoc.quotes);
      return;
    }

    let newQuotes = userDoc.quotes.filter((quote) => {
      return (
        quote.title.toLowerCase().includes(query) ||
        quote.author.toLowerCase().includes(query) ||
        quote.quote.toLowerCase().includes(query) ||
        quote.note.toLowerCase().includes(query) 
      );
    });

    if (newQuotes.length === 0) {
      setQuotes("no-results");
    } else {
      setCurPage(0);
      setQuotes(newQuotes);
    }
  };

  const handleSort = (e) => {
    let sortedQuotes = [...quotes];

    switch (e.target.value) {
      case "oldest":
        setQuotes([...originalQuotes]);
        setSortOption("oldest");
        break;
      case "newest":
        setQuotes([...originalQuotes].reverse());
        setSortOption("newest");
        break;
      case "book-desc":
        sortedQuotes.sort((a, b) => a.title.localeCompare(b.title));
        setQuotes(sortedQuotes);
        setSortOption("book-desc");
        break;
      case "book-asc":
        sortedQuotes.sort((a, b) => b.title.localeCompare(a.title));
        setQuotes(sortedQuotes);
        setSortOption("book-asc");
        break;
      case "author-desc":
        sortedQuotes.sort((a, b) => {
          const lastA = a.author.split(" ").pop();
          const lastB = b.author.split(" ").pop();
          return lastA.localeCompare(lastB);
        });

        setQuotes(sortedQuotes);
        setSortOption("author-desc");
        break;
      case "author-asc":
        sortedQuotes.sort((a, b) => {
          const lastA = a.author.split(" ").pop();
          const lastB = b.author.split(" ").pop();
          return lastB.localeCompare(lastA);
        });

        setQuotes(sortedQuotes);
        setSortOption("author-asc");
        break;
    }
  };

  return (
    <>
      <form className="flex mb-4 max-sm:mx-1">
        <input
          type="text"
          name="q"
          placeholder="Search by title, author, quote, note, or page..."
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

      <select className="p-2 mb-4 max-sm:mx-1 bg-white border text-gray-600 border-gray-300" value={sortOption} onChange={handleSort}>
        <option value="default" disabled>
          Sort Options
        </option>
        <option value="oldest">Oldest Added</option>
        <option value="newest">Newest Added</option>
        <option value="book-desc">Book Descending</option>
        <option value="book-asc">Book Ascending</option>
        <option value="author-desc">Author Descending</option>
        <option value="author-asc">Author Ascending</option>
      </select>
    </>
  );
}
