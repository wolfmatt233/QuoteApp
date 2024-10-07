import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../credentials";
import { doc, setDoc } from "firebase/firestore";
import Login from "./Login";

export default function SignUp({ setPage }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const createAccount = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (credential) => {
          let userDoc = {
            uid: credential.user.uid,
            username: name,
            quotes: [],
          };

          createUserDoc(userDoc);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createUserDoc = async (userDoc) => {
    try {
      await setDoc(doc(db, "QuotesDB", userDoc.uid), userDoc);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col max-w-sm w-1/2 border border-gray-300 rounded-md p-6 m-auto">
      <p className="text-center text-xl">Sign Up</p>
      <label htmlFor="uname">Username</label>
      <input
        type="text"
        name="uname"
        id="uname"
        className="basic-input"
        onChange={(e) => setName(e.target.value)}
      />
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
      <button
        className="blue-button my-3"
        onClick={createAccount}
      >
        Sign Up
      </button>
      <button
        className="hover:underline text-blue-500 mt-1"
        onClick={() => setPage(<Login setPage={setPage} />)}
      >
        Already have an account? Log in here!
      </button>
    </div>
  );
}
