import { useEffect, useState } from "react";
import { fetchApi } from "./functions/fetchApi";

export default function SearchList({ query, results, setResults, selectBook }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  //close dropdown when query changes
  useEffect(() => {
    setShowDropdown(false);
  }, [query]);

  //search books api using the query and populate the dropdown list
  const search = async (e) => {
    e.preventDefault();

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

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <p>Searching...</p>
          <i className="fas fa-circle-notch fa-spin mt-2 text-2xl"></i>
        </div>
      ) : (
        <button
          type="submit"
          onClick={search}
          className="mb-2 border border-gray-200 hover:bg-gray-200 rounded-md p-1 text-gray-500"
        >
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      )}

      {showDropdown && results.length > 0 ? (
        <div className="flex flex-col max-h-64 overflow-y-scroll mb-2 border border-gray-300 rounded-sm">
          {results.map((item, idx) => (
            <button
              key={idx}
              className="hover:bg-gray-100 flex items-center"
              onClick={(e) => selectBook(e, item)}
            >
              <img
                src={
                  item.volumeInfo.imageLinks?.smallThumbnail || "./no-cover.gif"
                }
                className="mr-3 h-20"
              />

              {item.volumeInfo.title}
            </button>
          ))}
        </div>
      ) : (
        showDropdown &&
        results.length == 0 && (
          <div className="mb-2 p-1 border border-gray-300 rounded-sm flex flex-col justify-center items center ">
            <i className="fa-solid fa-face-frown-open text-gray-700 text-center text-2xl my-1"></i>
            <p className="text-center text-lg text-gray-700">No books found.</p>
          </div>
        )
      )}
    </>
  );
}
