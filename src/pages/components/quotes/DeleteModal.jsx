import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../credentials";

export default function DeleteModal({
  deleteModal,
  setDeleteModal,
  quote,
  userDoc,
  setCurPage
}) {
  const deleteQuote = async () => {
    try {
      let newQuotes = userDoc.quotes.filter((quote) => quote.id != deleteModal);
      await updateDoc(doc(db, "QuotesDB", userDoc.uid), {
        quotes: newQuotes,
      });
      setCurPage(0);
    } catch (error) {
      setDeleteModal(null);
      alert("Error deleting quote.");
    }
  };

  return (
    <>
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
    </>
  );
}
