export default function Navbar({ handleBurger, burgerToggle }) {
  return (
    <div className="shadow-md bg-white">
      <nav className="px-11 h-12 items-center justify-center flex m-auto max-w-screen-xl relative max-sm:px-2">
        <div className="flex">
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
      </nav>
    </div>
  );
}
