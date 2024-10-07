import { useContext, useEffect, useState } from "react";
import UpdatePassword from "./components/user/UpdatePassword";
import DeleteAccount from "./components/user/DeleteAccount";
import UpdateUsername from "./components/user/UpdateUsername";

export default function User() {
  const [userPage, setUserPage] = useState("");

  return (
    <>
      <p className="text-center text-3xl mb-2">Account Center</p>
      <hr />

      <div className="flex items-center justify-evenly max-sm:flex-col mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-400 rounded-md p-2 my-3 text-white"
          onClick={() =>
            setUserPage(<UpdateUsername setUserPage={setUserPage} />)
          }
        >
          <i className="fa-solid fa-user-pen mr-2"></i>
          Change Username
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-400 rounded-md p-2 my-3 text-white"
          onClick={() =>
            setUserPage(<UpdatePassword setUserPage={setUserPage} />)
          }
        >
          <i className="fa-solid fa-lock mr-2"></i>
          Update Password
        </button>
        <button
          className="border border-gray-200 hover:bg-gray-200 my-3 p-2 rounded-md text-red-500"
          onClick={() =>
            setUserPage(<DeleteAccount setUserPage={setUserPage} />)
          }
        >
          <i className="fa-solid fa-trash mr-2"></i>
          Delete Account
        </button>
      </div>
      {userPage !== "" ? (
        userPage
      ) : (
        <p className="text-center">Choose an option to get started.</p>
      )}
    </>
  );
}
