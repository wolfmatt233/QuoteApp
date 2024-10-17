import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../credentials";
import { checkImageUrl } from "../../../../functions/checkImageUrl";
import Swal from "sweetalert2";

const InteractToast = (setPage, viewQuotes) =>
  Swal.mixin({
    toast: true,
    position: "top-end",
    confirmButtonColor: "rgb(96 165 250)",
    confirmButtonText: "View",
    preConfirm: () => {
      return setPage(viewQuotes);
    },
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

export const saveQuote = async (
  formData,
  setFormData,
  isManual,
  setQuery,
  setPage,
  viewQuotes
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

    InteractToast(setPage, viewQuotes).fire({
      icon: "success",
      title: "Quote created successfully.",
    });
  } catch (error) {
    InteractToast(setPage, viewQuotes).fire({
      icon: "error",
      title: "Quote creation failed.",
    });
  }
};
