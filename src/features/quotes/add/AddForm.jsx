import { useState } from "react";
import AddFormManual from "./AddFormManual";
import SearchList from "./SearchList";

export default function AddForm({ setFormType, saveQuote }) {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    author: "",
    title: "",
    image: "",
    quote: "",
    page: "",
    note: "",
  });
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const selectBook = (book) => {
    const newData = {
      author: book.volumeInfo.authors[0],
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks.thumbnail,
    };
    setQuery(
      `Selected: ${book.volumeInfo.title} by ${book.volumeInfo.authors[0]}`
    );
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <>
      <label htmlFor="book">Book</label>
      <input
        type="text"
        name="q"
        id="book"
        className="border border-gray-300 p-1 mb-4"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <button
        className="hover:underline text-blue-500 flex mb-3"
        onClick={() =>
          setFormType(
            <AddFormManual setFormType={setFormType} saveQuote={saveQuote} />
          )
        }
      >
        Can't find your book? Create a quote manually!
      </button>

      <SearchList
        query={query}
        results={results}
        setResults={setResults}
        selectBook={selectBook}
      />

      <label htmlFor="quote">Quote</label>
      <textarea
        name="quote"
        id="quote"
        className="border border-gray-300 p-1 mb-4"
        rows={4}
        value={formData.quote}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, quote: e.target.value }))
        }
      ></textarea>

      <label htmlFor="page">
        Page <span className="text-gray-400 text-sm">(optional)</span>
      </label>
      <input
        type="number"
        name="number"
        id="number"
        className="border border-gray-300 p-1 mb-4"
        value={formData.page}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, page: e.target.value }))
        }
      />

      <label htmlFor="notes">
        Notes <span className="text-gray-400 text-sm">(optional)</span>
      </label>
      <textarea
        name="notes"
        id="notes"
        className="border border-gray-300 p-1 mb-4"
        rows={4}
        value={formData.note}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, note: e.target.value }))
        }
      ></textarea>

      <button
        onClick={() => saveQuote(false, formData, setFormData, setQuery)}
        className="bg-blue-500 hover:bg-blue-400 rounded-xl p-2 text-white"
      >
        Create
      </button>
    </>
  );
}
