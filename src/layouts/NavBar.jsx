export default function Navbar({
  handleBurger,
  burgerToggle,
  setPage,
  pages,
  page,
  userDoc,
  logout,
}) {
  return (
    <div className="shadow-md bg-white">
      <nav className="px-11 h-[50px] items-center justify-center flex m-auto max-w-screen-xl relative max-sm:px-2">
        <div
          className="flex hover:cursor-pointer items-center justify-center"
          onClick={() => setPage(pages.home)}
        >
          <i className="fa-solid fa-book mr-1 mt-1"></i>
          <p className="text-xl">QuoteScribe</p>
        </div>
        <div
          className={`w-8 hover:cursor-pointer h-full absolute top-0 left-11 max-sm:left-2 z-20 ${burgerToggle}`}
          onClick={handleBurger}
        >
          <hr className="border-black absolute top-1/4 w-full" />
          <hr className="border-black absolute top-2/4 w-full" />
          <hr className="border-black absolute top-3/4 w-full" />
        </div>
        {userDoc && (
          <div className="absolute top-[7px] right-11 max-sm:right-2 flex items-center">
            <div
              onClick={() => setPage(pages.user)}
              className="cursor-pointer max-sm:right-2 flex items-center group"
            >
              <p className="max-md:hidden whitespace-nowrap text-sm text-ellipsis max-w-40 overflow-hidden">
                Welcome, {userDoc.username}!
              </p>
              <div
                className={`ml-2 flex items-center justify-center rounded-full w-9 h-9  group-hover:bg-blue-400 ${burgerToggle}`}
              >
                <i className="fa-solid fa-user text-xl text-black group-hover:text-white"></i>
              </div>
            </div>
            <div
              className="text-white w-9 h-9 rounded-md flex items-center justify-evenly hover:bg-blue-400  cursor-pointer ml-2 z-20 group"
              onClick={logout}
            >
              <i className="fa-solid fa-right-from-bracket text-xl hover:cursor-pointer text-black group-hover:text-white"></i>
            </div>
          </div>
        )}
      </nav>
      <hr />
      <div className="px-11 m-auto max-w-screen-xl relative max-sm:px-2">
        <div className="bg-white w-full py-4">
          <p className="text-xl">{page.title}</p>
        </div>
      </div>
    </div>
  );
}
