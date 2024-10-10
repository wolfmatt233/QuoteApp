import { useContext, useState } from "react";
import BookImage from "./BookImage";
import DeleteModal from "./DeleteModal";
import EditQuote from "../../../pages/EditQuote";
import { PageContext } from "../../../App";

export default function QuoteCard({ id, quote, userDoc, setCurPage, curPage }) {
  const { setPage } = useContext(PageContext);
  const [note, setNote] = useState(null);
  const [toggleHidden, setToggleHidden] = useState("");
  const [deleteModal, setDeleteModal] = useState();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(quote.quote);
      alert("Quote copied to clipboard!");
    } catch (error) {
      alert("Error copying.");
    }
  };

  return (
    <div
      key={quote.id}
      id={id}
      className="border border-gray-300 p-3 mb-3 flex relative"
    >
      {toggleHidden === "hidden" && (
        <div className="mr-3 h-[170px]">
          <i
            className="fa-solid fa-expand cursor-pointer hover:text-blue-400"
            onClick={() => setToggleHidden("")}
          ></i>
        </div>
      )}

      <div className={`mr-3 ${toggleHidden}`}>
        <div className="relative w-28 h-[170px] border">
          <div
            className="bg-black w-5 h-5 absolute right-0 flex items-center justify-center cursor-pointer group"
            onClick={() => setToggleHidden("hidden")}
          >
            <i className="fa-solid fa-compress text-white group-hover:text-blue-400"></i>
          </div>

          <BookImage image={quote.image} />
        </div>
        <div className="flex justify-around mt-3">
          <button
            className="mr-2 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center h-8 w-8"
            onClick={() =>
              setPage({
                component: (
                  <EditQuote quote={quote} curPage={curPage} id={id} />
                ),
                title: "Edit Quote",
              })
            }
          >
            <i className="fa-solid fa-pen-to-square text-lg text-gray-100"></i>
          </button>
          <button
            className="mr-2 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center h-8 w-8"
            onClick={() => setDeleteModal(quote.id)}
          >
            <i className="fa-solid fa-trash text-lg text-gray-100"></i>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-baseline flex-wrap">
            <p className="text-lg">{quote.title}</p>
            &nbsp;
            <p>by {quote.author}</p>
          </div>
          <button
            className="flex justify-center items-center hover:bg-blue-400 rounded-full ml-1 w-6 h-6 group"
            onClick={copyToClipboard}
          >
            <i className="fa-solid fa-share group-hover:text-white"></i>
          </button>
        </div>

        <hr className="border-gray-400 mb-3" />
        <p>"{quote.quote}"</p>
        {quote.page && <p>- Page {quote.page}</p>}
        {note === quote.id && (
          <>
            <hr className="border-gray-400 mt-3 mb-2" />
            <div>{quote.note}</div>
            <button
              onClick={() => setNote(null)}
              className="gray-button rounded-md p-1 mt-2 text-sm"
            >
              Hide note
            </button>
          </>
        )}
        {quote.note && note === null && (
          <button
            onClick={() => setNote(quote.id)}
            className="gray-button rounded-md p-1 mt-2 text-sm"
          >
            Show note
          </button>
        )}
      </div>

      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        quote={quote}
        userDoc={userDoc}
        setCurPage={setCurPage}
        curPage={curPage}
      />
    </div>
  );
}
