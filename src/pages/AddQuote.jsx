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
  const maxPages = Math.ceil(userDoc.quotes.length / 10);
  const viewQuotes = {
    component: <ViewQuotes page={maxPages} id={"last"} />,
    title: "Quotes",
  };

  const handleSaveQuote = (isManual, formData, setFormData, setQuery) => {
    saveQuote(formData, setFormData, isManual, setQuery, setPage, viewQuotes);
  };

  useEffect(() => {
    setFormType(
      <AddForm setFormType={setFormType} saveQuote={handleSaveQuote} />
    );
  }, []);

  return <div className="flex flex-col">{formType}</div>;
}
