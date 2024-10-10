import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../credentials";
import ForgotPassword from "../features/user/ForgotPassword";
import { PageContext } from "../App";

export default function Login() {
  const { setPage, pages } = useContext(PageContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [toggleForgot, setToggleForgot] = useState(false);
  const [message, setMessage] = useState(false);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login failed, check your credentials.");
    }
  };

  return (
    <>
      {toggleForgot === false && (
        <div className="flex flex-col max-md:w-full max-w-sm w-1/2 border border-gray-300 rounded-md p-6 m-auto">
          <p className="text-center text-xl">Login</p>
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
          <button className="blue-button my-3" onClick={signIn}>
            Sign In
          </button>
          <button
            className="hover:underline text-blue-500 mb-2"
            onClick={() => setToggleForgot(true)}
          >
            Forgot password?
          </button>
          <button
            className="hover:underline text-blue-500"
            onClick={() =>
              setPage(pages.signup)
            }
          >
            No account? Sign up here!
          </button>
        </div>
      )}
      {toggleForgot === true && (
        <ForgotPassword setToggleForgot={setToggleForgot} />
      )}
    </>
  );
}
