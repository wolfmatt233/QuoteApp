import { useContext, useEffect, useState } from "react";
import Context from "../context/ContextProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../credentials";
import EditQuote from "./EditQuote";

export default function ViewQuotes({ setPage }) {
  const { userDoc } = useContext(Context);
  const [curPage, setCurPage] = useState(userDoc.quotes);
  const [deleteModal, setDeleteModal] = useState();
  //TODO: pagination, visuals, route to edit

  const deleteQuote = async () => {
    try {
      let newQuotes = userDoc.quotes.filter((quote) => quote.id != deleteModal);
      await updateDoc(doc(db, "QuotesDB", userDoc.uid), {
        quotes: newQuotes,
      });
    } catch (error) {
      setDeleteModal(null);
      alert("Error deleting quote.");
    }
  };

  return (
    <>
      {userDoc.quotes.map((quote) => (
        <div
          key={quote.id}
          className="border border-gray-300 p-3 mb-3 flex relative"
        >
          <div className="mr-3">
            <img
              src={
                quote.image ||
                "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif"
              }
              alt="image"
              className="max-w-28"
              onError={(e) => {
                e.target.src =
                  "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif";
              }}
            />
            <div className="flex justify-around mt-3">
              <button
                className="mr-2 rounded-full bg-green-600 flex items-center justify-center h-8 w-8 group"
                onClick={() =>
                  setPage(<EditQuote quote={quote} setPage={setPage} />)
                }
              >
                <i className="fa-solid fa-pen-to-square text-lg text-gray-100 group-hover:text-green-300"></i>
              </button>
              <button
                className="mr-2 rounded-full bg-red-600 flex items-center justify-center h-8 w-8 group"
                onClick={() => setDeleteModal(quote.id)}
              >
                <i className="fa-solid fa-trash text-lg text-gray-100 group-hover:text-red-300"></i>
              </button>
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-baseline">
              <p className="text-lg">{quote.title}</p>
              &nbsp;<p>by</p>&nbsp;
              <p>{quote.author}</p>
            </div>
            <hr className="border-gray-400 mb-3" />
            <p>"{quote.quote}"</p>
            <p>- Page {quote.page}</p>
            <div>{quote.note}</div>
          </div>

          {deleteModal === quote.id && (
            <div className="w-full h-full center-position bg-black bg-opacity-40">
              <div className="center-position bg-gray-100 p-5 w-1/2 max-sm:w-3/4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 mr-2 rounded-full p-3 bg-red-500 flex items-center justify-center">
                    <i className="fa-solid fa-trash text-white"></i>
                  </div>
                  <p className="text-xl">Delete Quote</p>
                </div>
                <p>Are you sure?</p>
                <div className="flex mt-4">
                  <button
                    onClick={() => setDeleteModal(null)}
                    className="mr-2 w-1/2 gray-button"
                  >
                    Cancel
                  </button>
                  <button onClick={deleteQuote} className="w-1/2 red-button">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
