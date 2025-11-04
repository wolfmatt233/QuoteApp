import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../credentials";
import { useState } from "react";

export default function ForgotPassword({ setToggleForgot }) {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const forgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col max-md:w-full max-w-sm w-1/2 border border-gray-300 rounded-md p-6 m-auto">
      <p className="text-center text-xl">Reset Password</p>

      {error && (
        <p
          className="text-center text-white bg-red-500 p-2 my-3 rounded-md cursor-pointer"
          onClick={() => setError(false)}
        >
          <i className="fa-solid fa-circle-exclamation text-white mr-2"></i>
          Failed to send Password reset email.
        </p>
      )}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        className="basic-input"
        disabled={message ? true : false}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {message && (
        <p className="text-center text-white bg-green-600 p-2 my-3 rounded-md">
          <i className="fa-regular fa-circle-check mr-2"></i>
          Password reset email sent!
        </p>
      )}

      {!message && (
        <button className="blue-button my-3" onClick={forgotPassword}>
          Send Reset Email
        </button>
      )}
      <button className="gray-button" onClick={() => setToggleForgot(false)}>
        Close
      </button>
    </div>
  );
}
