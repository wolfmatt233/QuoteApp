import { useContext } from "react";
import { PageContext } from "../../../../App";
import EditQuote from "../../../../pages/EditQuote";

export default function IconButtons({ quote, curPage, id, setModal }) {
  const { setPage } = useContext(PageContext);

  return (
    <div className="flex justify-around mt-3">
      <button
        className="mr-2 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center h-8 w-8"
        onClick={() =>
          setPage({
            component: <EditQuote quote={quote} curPage={curPage} id={id} />,
            title: "Edit Quote",
          })
        }
      >
        <i className="fa-solid fa-pen-to-square text-lg text-gray-100"></i>
      </button>
      <button
        className="mr-2 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center h-8 w-8"
        onClick={() => setModal(quote.id)}
      >
        <i className="fa-solid fa-trash text-lg text-gray-100"></i>
      </button>
    </div>
  );
}
