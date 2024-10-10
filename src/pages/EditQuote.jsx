import { doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { auth, db } from "../credentials";
import Context from "../context/ContextProvider";
import { PageContext } from "../App";
import ViewQuotes from "./ViewQuotes";

export default function EditQuote({ quote, curPage, id }) {
  const { userDoc } = useContext(Context);
  const { setPage, pages } = useContext(PageContext);
  const [formData, setFormData] = useState({
    id: quote.id,
    author: quote.author,
    title: quote.title,
    image: quote.image,
    quote: quote.quote,
    page: quote.page,
    note: quote.note,
  });

  const checkImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const updateQuote = async () => {
    const { title, author, quote } = formData;

    if ([title, author, quote].some((field) => !field)) {
      return alert("Complete the required fields.");
    }

    const imageCheck = await checkImageUrl(formData.image);

    const updatedFormData = {
      ...formData,
      image: imageCheck ? formData.image : "",
    };

    if (imageCheck === false) {
      setFormData((prev) => ({ ...prev, image: "" }));
    }

    try {
      const newQuotes = userDoc.quotes.map((quote) =>
        quote.id === formData.id
          ? {
              ...quote,
              ...updatedFormData,
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

      const maxPage = Math.ceil(newQuotes.length / 10) - 1;

      setPage({
        component: <ViewQuotes page={maxPage} id={id} />,
        title: "Quotes",
      });
    } catch (error) {
      alert(error.message.split(" (")[0].replace("Firebase: ", ""));
    }
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
        cols={4}
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
