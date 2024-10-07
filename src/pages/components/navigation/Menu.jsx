export default function Menu({ changePage, menuToggle, pages, user, logout }) {
  return (
    <div
      className={`absolute top-0 h-full bg-white border text-center flex flex-col ${menuToggle} z-10`}
    >
      <div className="text-xl h-12 border-b flex items-center justify-center"></div>
      <button
        onClick={() => changePage(pages.home)}
        className="text-xl h-12 border-b flex items-center justify-center hover:bg-gray-100"
      >
        <i className="fa-solid fa-house mr-3"></i>
        Home
      </button>
      {user ? (
        <>
          <button
            onClick={() => changePage(pages.view)}
            className="text-xl h-12 border-b flex items-center justify-center hover:bg-gray-100"
          >
            <i className="fa-solid fa-pen-nib mr-3"></i>
            Quotes
          </button>
          <button
            onClick={() => changePage(pages.add)}
            className="text-xl h-12 border-b flex items-center justify-center hover:bg-gray-100"
          >
            <i className="fa-solid fa-plus mr-3"></i>
            Add a Quote
          </button>
          <button
            onClick={logout}
            className="text-xl h-12 border-b flex items-center justify-center hover:bg-gray-100"
          >
            <i className="fa-solid fa-right-from-bracket mr-3"></i>
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => changePage(pages.login)}
            className="text-xl h-12 border-b flex items-center justify-center hover:bg-gray-100"
          >
            Log In
          </button>
          <button
            onClick={() => changePage(pages.signup)}
            className="text-xl h-12 border-b flex items-center justify-center hover:bg-gray-100"
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}
