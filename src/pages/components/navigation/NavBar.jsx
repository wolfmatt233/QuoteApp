export default function Navbar({
  handleBurger,
  burgerToggle,
  changePage,
  pages,
  userDoc,
}) {
  return (
    <div className="shadow-md bg-white">
      <nav className="px-11 h-12 items-center justify-center flex m-auto max-w-screen-xl relative max-sm:px-2">
        <div className="flex hover:cursor-pointer" onClick={() => changePage(pages.home)}>
          <img src="./book.svg" alt="book-svg" className="w-8 mt-[1px]" />
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
          <div
            onClick={() => changePage(pages.user)}
            className="hover:cursor-pointer absolute top-1 right-11 flex items-center"
          >
            <p className="max-md:hidden">{userDoc.username}</p>
            <div
              className={`ml-2 flex items-center justify-center rounded-full border w-9 h-9 border-black hover:cursor-pointer  max-sm:right-2 z-20 ${burgerToggle}`}
            >
              <i className="fa-solid fa-user text-xl"></i>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
