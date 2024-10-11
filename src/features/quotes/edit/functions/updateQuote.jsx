import { doc, updateDoc } from "firebase/firestore";
import { checkImageUrl } from "../../../../functions/checkImageUrl";
import ViewQuotes from "../../../../pages/ViewQuotes";
import { db } from "../../../../credentials";

export const updateQuote = async (
  formData,
  setFormData,
  userDoc,
  setPage,
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

    const maxPage = Math.ceil(newQuotes.length / 10) - 1;

    setPage({
      component: <ViewQuotes page={maxPage} id={id} />,
      title: "Quotes",
    });
  } catch (error) {
    alert(error.message.split(" (")[0].replace("Firebase: ", ""));
  }
};
