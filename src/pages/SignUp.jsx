import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth, db } from "../credentials";
import { doc, setDoc } from "firebase/firestore";
import { PageContext } from "../App";

export default function SignUp() {
  const { setPage, pages } = useContext(PageContext);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState(false);

  const createAccount = async () => {
    try {
      if (name === "") {
        throw "Missing name.";
      } else if (password.length < 6) {
        throw "Password must be at least 6 characters.";
      }

      await createUserWithEmailAndPassword(auth, email, password).then(
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
      if (error.message) {
        let fbError = error.message.split("/")[1].split(")")[0];

        //replace dash with space, replace first char with uppercase, add period
        error =
          fbError
            .replace("-", " ")
            .replace(/^./, (char) => char.toUpperCase()) + ".";
      }

      setMessage(error);
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
    <div className="flex flex-col max-md:w-full max-w-sm w-1/2 border border-gray-300 rounded-md p-6 m-auto">
      <p className="text-center text-xl">Sign Up</p>
      {message && (
        <p
          className="text-center text-white bg-red-500 p-2 my-3 rounded-md cursor-pointer"
          onClick={() => setMessage(false)}
        >
          <i className="fa-solid fa-circle-exclamation text-white mr-2"></i>
          {message}
        </p>
      )}
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
      <button className="blue-button my-3" onClick={createAccount}>
        Sign Up
      </button>
      <button
        className="hover:underline text-blue-500 mt-1"
        onClick={() => setPage(pages.login)}
      >
        Already have an account? Log in here!
      </button>
    </div>
  );
}
