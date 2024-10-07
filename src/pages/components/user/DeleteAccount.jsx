import { useState } from "react";
import { auth, db } from "../../../credentials";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

export default function DeleteAccount({ setUserPage }) {
  const [confirm, setConfirm] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  if (confirm === false) {
    return (
      <div className="w-[384px] border border-gray-300 rounded-md p-6 m-auto">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 mr-2 rounded-full p-3 bg-red-500 flex items-center justify-center">
            <i className="fa-solid fa-trash text-white"></i>
          </div>
          <p className="text-xl">Delete Account</p>
        </div>

        <p>
          Are you sure you want to delete your account? This means that you will
          permanently lose your profile and data. This action cannot be
          reversed.
        </p>
        <div className="flex justify-around">
          <button
            className="w-1/2 mr-3 my-3 gray-button"
            onClick={() => setUserPage("")}
          >
            Cancel
          </button>
          <button
            className="w-1/2 my-3 red-button"
            onClick={() => setConfirm(true)}
          >
            Continue
          </button>
        </div>
      </div>
    );
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
      alert(
        "There was an error deleting your account, check your credentials."
      );
    }
  };

  return (
    <div className="flex flex-col w-[384px] border border-gray-300 rounded-md p-6 m-auto">
      <p className="text-center text-xl">Confirm Credentials</p>
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
        <button
          className="w-1/2 red-button"
          onClick={reauthDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
