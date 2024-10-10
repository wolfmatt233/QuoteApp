import { useContext, useEffect, useState } from "react";
import AddForm from "../features/quotes/add/AddForm";
import { PageContext } from "../App";
import Context from "../context/ContextProvider";
import ViewQuotes from "./ViewQuotes";
import { saveQuote } from "../features/quotes/add/functions/saveQuote";

export default function AddQuote() {
  const { setPage } = useContext(PageContext);
  const { userDoc } = useContext(Context);
  const [formType, setFormType] = useState("");
  const [showMessage, setShowMessage] = useState("hidden");

  const maxPages = Math.ceil(userDoc.quotes.length / 10) - 1;
  const handleSaveQuote = (isManual, formData, setFormData, setQuery) => {
    saveQuote(formData, setFormData, setShowMessage, isManual, setQuery);
  };

  useEffect(() => {
    setFormType(
      <AddForm setFormType={setFormType} saveQuote={handleSaveQuote} />
    );
  }, []);

  return (
    <div className="flex flex-col">
      <div
        className={`${showMessage} bg-green-500 flex items-center justify-between my-1 rounded-sm p-2 text-white`}
      >
        <p>Success!</p>
        <button onClick={() => setShowMessage("hidden")}>
          <i className="fa-regular fa-circle-xmark hover:text-red-400"></i>
        </button>
      </div>

      <button
        className={`${showMessage} blue-button my-3`}
        onClick={() => {
          setPage({
            component: <ViewQuotes page={maxPages} id={"last"} />,
            title: "Quotes",
          });
        }}
      >
        View your new quote!
      </button>

      {formType}
    </div>
  );
}
