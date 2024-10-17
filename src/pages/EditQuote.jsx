import { useContext, useState } from "react";
import Context from "../context/ContextProvider";
import { PageContext } from "../App";
import ViewQuotes from "./ViewQuotes";
import { updateQuote } from "../features/quotes/edit/functions/updateQuote";

export default function EditQuote({ quote, curPage, id }) {
  const { userDoc } = useContext(Context);
  const { setPage } = useContext(PageContext);
  const [formData, setFormData] = useState({
    id: quote.id,
    author: quote.author,
    title: quote.title,
    image: quote.image,
    quote: quote.quote,
    page: quote.page,
    note: quote.note,
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    updateQuote(formData, setFormData, userDoc, setPage, curPage, id);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          setPage({
            component: <ViewQuotes page={curPage} id={id} />,
            title: "Quotes",
          });
        }}
        className="border-b border-b-transparent hover:border-blue-500 text-blue-500 mb-3 self-start inline-flex items-center"
      >
        <i className="fa-solid fa-arrow-left mr-1 mt-1"></i> Back to Quotes.
      </button>

      <form className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="border border-gray-300 p-1 mb-4"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <label htmlFor="title">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          className="border border-gray-300 p-1 mb-4"
          value={formData.author}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, author: e.target.value }))
          }
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

        <label htmlFor="title">
          Image <span className="text-gray-400 text-sm">(optional)</span>
        </label>
        <input
          type="text"
          name="image"
          id="image"
          className="border border-gray-300 p-1 mb-4"
          value={formData.image}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, image: e.target.value }))
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
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-400 rounded-xl p-2 text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
}
