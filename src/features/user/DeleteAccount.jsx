import { useState } from "react";
import { auth, db } from "../../credentials";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import ConfirmDelete from "./ConfirmDelete";

export default function DeleteAccount({ setUserPage }) {
  const [confirm, setConfirm] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  if (confirm === false) {
    return <ConfirmDelete setUserPage={setUserPage} setConfirm={setConfirm} />;
  }

  const reauthDelete = async () => {
    try {
      const uid = auth.currentUser.uid;
      const credential = EmailAuthProvider.credential(email, password);

      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteUser(auth.currentUser);
      await deleteDoc(doc(db, "QuotesDB", uid));

      setUserPage("");
    } catch (error) {
      if (error.message) {
        let fbError = error.message.split("/")[1].split(")")[0];

        //replace dash with space, replace first char with uppercase, add period
        error =
          fbError
            .replace("-", " ")
            .replace(/^./, (char) => char.toUpperCase()) + ".";
      }

      setError(error);
    }
  };

  return (
    <div className="flex flex-col w-[384px] border border-gray-300 rounded-md p-6 m-auto">
      <p className="text-center text-xl">Confirm Credentials</p>

      {error && (
        <p
          className="text-center text-white bg-red-500 p-2 my-3 rounded-md cursor-pointer"
          onClick={() => setError(false)}
        >
          <i className="fa-solid fa-circle-exclamation text-white mr-2"></i>
          {error}
        </p>
      )}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        className="basic-input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="basic-input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-around mt-3 mb-4">
        <button
          className="w-1/2 mr-3 gray-button"
          onClick={() => setUserPage("")}
        >
          Cancel
        </button>
        <button className="w-1/2 red-button" onClick={reauthDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
