import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../credentials";
import { useState } from "react";

export default function ForgotPassword({ setToggleForgot }) {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState(false);

  const forgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(true);
    } catch (error) {
      alert("Error sending email.");
    }
  };

  return (
    <div className="flex flex-col max-md:w-full max-w-sm w-1/2 border border-gray-300 rounded-md p-6 m-auto">
      <p className="text-center text-xl">Reset Password</p>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        className="basic-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {message && <p className="text-center text-green-600">Password reset email sent!</p>}
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
