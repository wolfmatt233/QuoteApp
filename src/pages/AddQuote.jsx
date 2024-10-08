import { useContext, useEffect, useState } from "react";
import AddForm from "./components/quotes/AddForm";
import Context from "../context/ContextProvider";
import { PageContext } from "../App";

export default function AddQuote() {
  const [formType, setFormType] = useState();
  const { userDoc, setUserDoc } = useContext(Context);
  const { setPage, pages } = useContext(PageContext);

  useEffect(() => {
    setFormType(
      <AddForm
        setFormType={setFormType}
        setPage={setPage}
        pages={pages}
      />
    );
  }, []);

  return <div className="flex flex-col">{formType}</div>;
}
