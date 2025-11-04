export default function ConfirmDelete({ setUserPage, setConfirm }) {
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
        permanently lose your profile and data. This action cannot be reversed.
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
