import { useContext, useEffect, useState } from "react";
import AddForm from "./components/quotes/AddForm";
import Context from "../context/ContextProvider";

export default function AddQuote() {
  const [formType, setFormType] = useState();
  const { userDoc, setUserDoc } = useContext(Context);

  useEffect(() => {
    setFormType(<AddForm setFormType={setFormType} userDoc={userDoc} setUserDoc={setUserDoc} />);
  }, []);

  return <div className="flex flex-col">{formType}</div>;
}
