import { useContext, useEffect } from "react";
import Context from "../context/ContextProvider";

export default function Home() {
  const { user, userDoc } = useContext(Context);

  return (
    <>
      <p className="text-xl mb-3 text-center">Home</p>
      <div className="text-center">
        <p>QuoteScribe allows you to catalogue your favorite book quotes!</p>
        <p>Digital, physical, or audiobook, you can specify.</p>
        <p>
          Add details to your quotes like character, page number, book title,
          author.
        </p>
        <p>Share!</p>
        {!user ? (
          <p>Not logged in.</p>
        ) : userDoc ? ( 
          <p>Welcome, {userDoc.username}</p>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}
