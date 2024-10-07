import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../credentials";
import AddFormManual from "./AddFormManual";

export default function AddForm({ setFormType }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    author: "",
    title: "",
    image: "",
    quote: "",
    page: "",
    note: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState("hidden");

  useEffect(() => {
    setShowDropdown(false);
  }, [query]);

  const fetchApi = async (query) => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}`
    );
    const data = await response.json();
    return data.docs;
  };

  const search = async () => {
    if (query.length > 1) {
      setLoading(true);
      const fetchData = async () => {
        const resultsData = await fetchApi(query);
        setResults(resultsData);
        setShowDropdown(true);
        setLoading(false);
      };
      fetchData();
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const selectBook = (book) => {
    const newData = {
      author: book.author_name[0],
      title: book.title,
      image: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
    };
    setQuery(`Selected: ${book.title} by ${book.author_name[0]}`);
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const saveQuote = async () => {
    const { title, author, image, quote } = formData;

    if ([title, author, image, quote].some((field) => !field)) {
      return alert("Complete the required fields.");
    }

    try {
      await updateDoc(doc(db, "QuotesDB", auth.currentUser.uid), {
        quotes: arrayUnion(formData),
      });

      setFormData({
        id: crypto.randomUUID(),
        title: "",
        author: "",
        image: "",
        quote: "",
        note: "",
        page: "",
      });
      setQuery("");
      setShowMessage("");
    } catch (error) {
      alert(error.message.split(" (")[0].replace("Firebase: ", ""));
    }
  };

  return (
    <>
      <p className="text-xl mb-2">Add a Quote</p>
      <hr className="mb-2" />

      <div
        className={`${showMessage} bg-green-500 flex items-center justify-between my-1 rounded-sm p-2 text-white`}
      >
        <p>Success!</p>
        <button onClick={() => setShowMessage("hidden")}>
          <i className="fa-regular fa-circle-xmark hover:text-red-600"></i>
        </button>
      </div>

      <label htmlFor="book">Book</label>
      <input
        type="text"
        name="book"
        id="book"
        className="border border-gray-300 p-1 mb-4"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <p>Searching...</p>
          <i className="fas fa-circle-notch fa-spin mt-2 text-2xl"></i>
        </div>
      ) : (
        <button
          onClick={search}
          className="mb-2 border border-gray-200 hover:bg-gray-200 rounded-md p-1 text-gray-500"
        >
          Search
        </button>
      )}

      <button
        className="hover:underline text-blue-500 flex mb-3"
        onClick={() => setFormType(<AddFormManual setFormType={setFormType} />)}
      >
        Can't find your book? Create a quote manually!
      </button>

      {showDropdown && results.length > 0 && (
        <div className="flex flex-col max-h-64 overflow-y-scroll mb-2 border border-gray-300 rounded-sm">
          {results.map((item, idx) => (
            <button
              key={idx}
              className="hover:bg-gray-100 flex items-center"
              onClick={() => selectBook(item)}
            >
              {item.cover_i === undefined ? (
                <img
                  src={`https://svgcollections.com/wp-content/uploads/2024/06/closed_book_IZlBz.png`}
                  className="mr-3 max-h-[50px]"
                />
              ) : (
                <img
                  src={`https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg`}
                  className="mr-3"
                />
              )}

              {item.title}
            </button>
          ))}
        </div>
      )}

      <label htmlFor="quote">Quote</label>
      <textarea
        name="quote"
        id="quote"
        className="border border-gray-300 p-1 mb-4"
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
        value={formData.note}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, note: e.target.value }))
        }
      ></textarea>
      <button
        onClick={saveQuote}
        className="bg-blue-500 hover:bg-blue-400 rounded-xl p-2 text-white"
      >
        Create
      </button>
    </>
  );
}
