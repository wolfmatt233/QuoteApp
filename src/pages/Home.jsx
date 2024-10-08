import { useContext, useEffect } from "react";
import Context from "../context/ContextProvider";
import { PageContext } from "../App";

export default function Home() {
  const { user } = useContext(Context);
  const { setPage, pages } = useContext(PageContext);

  return (
    <>
      <div>
        <p className="text-2xl text-center mb-5">Welcome to QuoteScribe!</p>
        <div className="bg-black w-1/2 m-auto rounded-lg max-sm:w-full">
          <img
            src={"./banner.jpeg"}
            alt="image"
            className="opacity-50 rounded-lg"
          />
        </div>
        <div className="max-sm:w-full w-3/4 m-auto mt-5">
          <p className="indent-3">
            QuoteScribe allows you to catalogue your favorite book quotes! Add a
            page number, add an image, add all the notes you want, or don't!
            It's all up to you! Share with your friends! Easily share your
            quotes to social media!
          </p>
          {user && (
            <ul>
              <p>Pages:</p>
              <li className="list-disc ml-6">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setPage(pages.user)}
                >
                  Account
                </button>
              </li>
              <li className="list-disc ml-6">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setPage(pages.view)}
                >
                  Quotes
                </button>
              </li>
              <li className="list-disc ml-6">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setPage(pages.add)}
                >
                  Add a Quote
                </button>
              </li>
              <li className="list-disc ml-6">
                <p>Edit Quote (via view quotes page)</p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
