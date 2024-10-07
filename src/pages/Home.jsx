import { useContext, useEffect } from "react";
import Context from "../context/ContextProvider";

export default function Home({ setPage, pages }) {
  const { user } = useContext(Context);

  return (
    <>
      <p className="text-xl mb-3 text-center">Home</p>
      <div>
        <p>QuoteScribe allows you to catalogue your favorite book quotes!</p>
        <p>
          Add a page number, or don't. Add an image, or don't. Add all the notes
          you want, or don't! It's all up to you!
        </p>
        <p>
          Share with your friends! Easily share your quotes to social media!
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
    </>
  );
}
