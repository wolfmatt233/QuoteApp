import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../credentials";

const checkImageUrl = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export const saveQuote = async (
  formData,
  setFormData,
  setShowMessage,
  isManual,
  setQuery
) => {
  const { title, author, quote } = formData;

  if ([title, author, quote].some((field) => !field)) {
    return alert("Complete the required fields.");
  }

  let newFormData = formData;

  if (isManual === true) {
    const imageCheck = await checkImageUrl(formData.image);

    newFormData = {
      ...formData,
      image: imageCheck ? formData.image : "",
    };

    if (imageCheck === false) {
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  }

  try {
    await updateDoc(doc(db, "QuotesDB", auth.currentUser.uid), {
      quotes: arrayUnion(newFormData),
    });

    setShowMessage("");

    setFormData({
      id: crypto.randomUUID(),
      title: "",
      author: "",
      image: "",
      quote: "",
      note: "",
      page: "",
    });

    if (isManual === false) {
      setQuery("");
    }
  } catch (error) {
    alert(error.message.split(" (")[0].replace("Firebase: ", ""));
  }
};
