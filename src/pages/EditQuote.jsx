import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../credentials";
import Context from "../context/ContextProvider";
import ViewQuotes from "./ViewQuotes";

export default function EditQuote({ quote, setPage }) {
  const { userDoc } = useContext(Context);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({
    id: quote.id,
    author: quote.author,
    title: quote.title,
    image: quote.image,
    quote: quote.quote,
    page: quote.page,
    note: quote.note,
  });

  const updateQuote = async () => {
    const { title, author, quote, page } = formData;

    if ([title, author, quote].some((field) => !field)) {
      return alert("Complete the required fields.");
    }

    try {
      const newQuotes = userDoc.quotes.map((quote) =>
        quote.id === formData.id
          ? {
              ...quote,
              ...formData,
            }
          : quote
      );

      await updateDoc(doc(db, "QuotesDB", auth.currentUser.uid), {
        quotes: newQuotes,
      });

      setFormData({
        title: "",
        author: "",
        image: "",
        quote: "",
        note: "",
        page: "",
      });

      setPage(<ViewQuotes setPage={setPage} />);
    } catch (error) {
      alert(error.message.split(" (")[0].replace("Firebase: ", ""));
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-xl mb-2">Edit Quote</p>
      <hr className="mb-2" />

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
        value={formData.note}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, note: e.target.value }))
        }
      ></textarea>

      <button
        onClick={updateQuote}
        className="bg-blue-500 hover:bg-blue-400 rounded-xl p-2 text-white"
      >
        Update
      </button>
    </div>
  );
}
