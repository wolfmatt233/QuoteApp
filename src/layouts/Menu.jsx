export default function Menu({
  setPage,
  menuToggle,
  pages,
  user,
  logout,
  page,
}) {
  return (
    <div
      className={`absolute top-0 h-full bg-white border text-center flex flex-col ${menuToggle} z-10`}
    >
      <div className="text-xl h-12 border-b flex items-center justify-center"></div>
      <button
        onClick={() => setPage(pages.home)}
        className={`menu-button ${
          page.title === "Home" && "bg-blue-400 text-white hover:bg-blue-300"
        }`}
      >
        <i className="fa-solid fa-house mr-3"></i>
        Home
      </button>
      {user ? (
        <>
          <button
            onClick={() => setPage(pages.view)}
            className={`menu-button ${
              page.title === "Quotes" &&
              "bg-blue-400 text-white hover:bg-blue-300"
            }`}
          >
            <i className="fa-solid fa-pen-nib mr-3"></i>
            Quotes
          </button>
          <button
            onClick={() => setPage(pages.add)}
            className={`menu-button ${
              page.title === "Add a Quote" &&
              "bg-blue-400 text-white hover:bg-blue-300"
            }`}
          >
            <i className="fa-solid fa-plus mr-3"></i>
            Add a Quote
          </button>
          <button onClick={logout} className="menu-button">
            <i className="fa-solid fa-right-from-bracket mr-3"></i>
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setPage(pages.login)}
            className="text-xl h-12 border-b flex items-center justify-center hover:bg-gray-100"
          >
            <i className="fa-solid fa-right-to-bracket mr-3"></i>
            Log In
          </button>
          <button
            onClick={() => setPage(pages.signup)}
            className="text-xl h-12 border-b flex items-center justify-center hover:bg-gray-100"
          >
            <i className="fa-solid fa-user-plus mr-3"></i>
            Sign Up
          </button>
        </>
      )}
    </div>
  );
}
