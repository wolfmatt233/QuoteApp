import { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../credentials";
import Context from "../../../../context/ContextProvider";

export default function DeleteModal({ id, setModal, setCurPage, curPage }) {
  const { userDoc } = useContext(Context);

  const deleteQuote = async () => {
    try {
      let newQuotes = userDoc.quotes.filter((quote) => quote.id != id);

      await updateDoc(doc(db, "QuotesDB", userDoc.uid), {
        quotes: newQuotes,
      });

      // if the current page no longer exists, send user to the last possible page
      let maxPages = Math.ceil(newQuotes.length / 10) - 1;

      if (curPage > maxPages) {
        setCurPage(maxPages);
      }
    } catch (error) {
      setModal(null);
      alert("Error deleting quote.");
    }
  };

  return (
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
            onClick={() => setModal(null)}
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
  );
}
