import { doc, updateDoc } from "firebase/firestore";
import { checkImageUrl } from "../../../../functions/checkImageUrl";
import ViewQuotes from "../../../../pages/ViewQuotes";
import { db } from "../../../../credentials";
import { Toast } from "../../../../functions/toast";

export const updateQuote = async (
  formData,
  setFormData,
  userDoc,
  setPage,
  curPage,
  id
) => {
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

    await updateDoc(doc(db, "QuotesDB", userDoc.uid), {
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

    setPage({
      component: <ViewQuotes page={curPage} id={id} />,
      title: "Quotes",
    });

    Toast.fire({
      icon: "success",
      title: "Quote updated successfully.",
    });
  } catch (error) {
    Toast.fire({
      icon: "error",
      title: "Quote failed updating.",
    });
  }
};
