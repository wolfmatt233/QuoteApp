import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../credentials";

export const getUserDoc = async () => {
  try {
    return await getDoc(doc(db, "QuotesDB", auth.currentUser.uid));
  } catch (error) {
    console.log(error);
  }
};

export const changeUsername = async (name) => {
  try {
    await updateDoc(doc(db, "QuotesDB", auth.currentUser, uid), {
      username: name,
    });
  } catch (error) {
    console.log(error);
  }
};
