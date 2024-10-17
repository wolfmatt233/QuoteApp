import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../credentials";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import Swal from "sweetalert2";

export default function UpdatePassword({ setUserPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);

  const reauthPassword = async () => {
    try {
      if (newPassword.length < 6) {
        throw "Password must be at least 6 characters";
      }

      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);

      setUserPage("");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Password successfully changed.",
        confirmButtonColor: "rgb(37 99 235)",
      });
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
    <div className="flex flex-col w-[384px] border border-gray-300 rounded-md p-3 m-auto">
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
      <label htmlFor="confirmPassword">New Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        className="basic-input"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <div className="flex justify-around mt-3 max-sm:flex-col">
        <button
          className="max-sm:w-full max-sm:m-0 mr-3 w-1/2 gray-button"
          onClick={() => setUserPage("")}
        >
          Cancel
        </button>
        <button
          className="max-sm:w-full max-sm:mt-2 w-1/2 blue-button"
          onClick={reauthPassword}
        >
          Save
        </button>
      </div>
    </div>
  );
}
