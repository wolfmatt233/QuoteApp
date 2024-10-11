import { useState } from "react";
import AddForm from "./AddForm";

export default function AddFormManual({ setFormType, saveQuote }) {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    author: "",
    title: "",
    image: "",
    quote: "",
    page: "",
    note: "",
  });

  const handleSave = (e) => {
    e.preventDefault();
    saveQuote(true, formData, setFormData);
  };

  return (
    <>
      <button
        className="border-b border-b-transparent hover:border-blue-500 text-blue-500 mb-3 self-start inline-flex items-center"
        onClick={() =>
          setFormType(
            <AddForm setFormType={setFormType} saveQuote={saveQuote} />
          )
        }
      >
        <i className="fa-solid fa-arrow-left mr-1 mt-1"></i> Back to automatic
        mode.
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

        <label htmlFor="author">Author</label>
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
          name="page"
          id="page"
          className="border border-gray-300 p-1 mb-4"
          value={formData.page}
          onChange={(e) => {
            const value = e.target.value;
            const numValue = Number(value);
            setFormData((prev) => ({
              ...prev,
              page: isNaN(numValue) ? 0 : numValue,
            }));
          }}
        />

        <label htmlFor="image">
          Image <span className="text-gray-400 text-sm">(optional)</span>
        </label>
        <input
          type="text"
          name="image"
          id="image"
          className="border border-gray-300 p-1 mb-4"
          placeholder="Enter an image url"
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
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-400 rounded-xl p-2 text-white"
        >
          Create
        </button>
      </form>
    </>
  );
}
