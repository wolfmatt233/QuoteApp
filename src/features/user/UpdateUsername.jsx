import { useContext, useState } from "react";
import { auth, db } from "../../credentials";
import Context from "../../context/ContextProvider";
import { doc, updateDoc } from "firebase/firestore";

export default function UpdateUsername({ setUserPage }) {
  const { userDoc } = useContext(Context);
  const [name, setName] = useState(userDoc.username);

  const changeUsername = async () => {
    try {
      await updateDoc(doc(db, "QuotesDB", auth.currentUser.uid), {
        username: name,
      });
      setUserPage("");
      alert("Username changed successfully.");
    } catch (error) {
      alert("Error updating username.");
      setName(userDoc.username);
    }
  };

  return (
    <div className="flex flex-col w-[384px] border border-gray-300 rounded-md p-6 m-auto">
      <p className="text-center text-xl">Change Username</p>
      <label htmlFor="name">New Username</label>
      <input
        type="name"
        name="name"
        id="name"
        value={name}
        className="basic-input mb-4"
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex justify-around max-sm:flex-col">
        <button
          className="max-sm:w-full max-sm:m-0 mr-3 w-1/2 gray-button"
          onClick={() => setUserPage("")}
        >
          Cancel
        </button>
        <button
          className="max-sm:w-full max-sm:mt-2 w-1/2 blue-button"
          onClick={changeUsername}
        >
          Save
        </button>
      </div>
    </div>
  );
}
