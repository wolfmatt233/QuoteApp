import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db, liveKey } from "../../../credentials";
import AddFormManual from "./AddFormManual";

export default function AddForm({ setFormType, setPage, pages }) {
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
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${liveKey}`
    );
    const data = await response.json();
    return data.items;
  };

  const search = async () => {
    if (query.length > 1) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const resultsData = await fetchApi(query);
          setResults(resultsData);
          setShowDropdown(true);
          setLoading(false);
        } catch (error) {
          alert("Error getting data, try adding your quote manually.");
          setLoading(false);
          setResults([]);
          setShowDropdown(false);
        }
      };
      fetchData();
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const selectBook = (book) => {
    const newData = {
      author: book.volumeInfo.authors[0],
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks.thumbnail,
    };
    setQuery(`Selected: ${book.volumeInfo.title} by ${book.volumeInfo.authors[0]}`);
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
      <div
        className={`${showMessage} bg-green-500 flex items-center justify-between my-1 rounded-sm p-2 text-white`}
      >
        <p>Success!</p>
        <button onClick={() => setShowMessage("hidden")}>
          <i className="fa-regular fa-circle-xmark hover:text-red-400"></i>
        </button>
      </div>

      <button
        className={`${showMessage} blue-button my-3`}
        onClick={() => setPage(pages.view)}
      >
        View your new quote!
      </button>

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
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      )}

      <button
        className="hover:underline text-blue-500 flex mb-3"
        onClick={() =>
          setFormType(
            <AddFormManual
              setFormType={setFormType}
              setPage={setPage}
              pages={pages}
            />
          )
        }
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
              <img
                src={item.volumeInfo.imageLinks?.smallThumbnail || "./no-cover.gif"}
                className="mr-3 h-20"
              />

              {item.volumeInfo.title}
            </button>
          ))}
        </div>
      )}

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
        onClick={saveQuote}
        className="bg-blue-500 hover:bg-blue-400 rounded-xl p-2 text-white"
      >
        Create
      </button>
    </>
  );
}
