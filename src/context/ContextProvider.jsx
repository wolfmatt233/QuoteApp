import { createContext, useEffect, useState } from "react";
import { auth, db } from "../credentials";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const Context = createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState();
  const [userDoc, setUserDoc] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const fetchUserData = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          const userId = user.uid;

          const userDocRef = doc(db, "QuotesDB", userId);
          unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              setUserDoc(doc.data());
            } else {
              setUserDoc(null);
            }
          });
        } else {
          setUser(null);
          setUserDoc(null);
        }

        setLoading(false);
      });
    };

    fetchUserData();

    // Cleanup the snapshot listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <Context.Provider value={{ user, setUser, userDoc, setUserDoc, loading }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
