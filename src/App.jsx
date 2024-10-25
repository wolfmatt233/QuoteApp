import { useEffect, useState, useContext, createContext } from "react";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./layouts/NavBar";
import Menu from "./layouts/Menu";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import useMenuToggle from "./functions/useMenuToggle";
import AddQuote from "./pages/AddQuote";
import ViewQuotes from "./pages/ViewQuotes";
import User from "./pages/User";
import Context from "./context/ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "./credentials";

export const PageContext = createContext();

function App() {
  const { user, userDoc, loading } = useContext(Context);
  const [page, setPage] = useState("");

  const pages = {
    home: { component: <Home />, title: "Home" },
    login: { component: <Login />, title: "Log In" },
    signup: { component: <SignUp />, title: "SignUp" },
    user: { component: <User />, title: "Your Account" },
    add: { component: <AddQuote />, title: "Add a Quote" },
    view: { component: <ViewQuotes page={0} />, title: "Quotes" },
  };

  const { menuToggle, closeMenu, burgerToggle, handleBurger } = useMenuToggle();

  useEffect(() => {
    setPage(pages.home);
  }, [user]);

  useEffect(() => {
    closeMenu();
  }, [page]);

  const logout = async () => {
    try {
      await signOut(auth);
      setPage(pages.home);
    } catch (error) {
      alert("There was an error signing you out.");
    }
  };

  if (loading) {
    return (
      <i className="fas fa-circle-notch fa-spin mt-2 text-5xl absolute top-1/3 left-1/2 translate-y-[-50%] translate-x-[-50%] text-black"></i>
    );
  }

  return (
    <PageContext.Provider value={{ setPage, pages }}>
      <div className="relative bg-gray-100">
        <Menu
          setPage={setPage}
          menuToggle={menuToggle}
          pages={pages}
          user={user}
          logout={logout}
          page={page}
        />
        <Navbar
          handleBurger={handleBurger}
          burgerToggle={burgerToggle}
          setPage={setPage}
          pages={pages}
          page={page}
          userDoc={userDoc}
          logout={logout}
        />

        <div className="mx-auto px-11 py-10 max-w-screen-xl max-sm:px-0">
          <div className="min-h-[calc(100vh-231px)] rounded-lg bg-white border-gray-300 border-[1px] p-5 max-sm:px-0 max-sm:rounded-none">
            {page.component}
          </div>
        </div>

        <div className="footer-shadow">
          <footer className="text-center m-auto max-w-screen-xl h-10 flex items-center justify-around">
            <p>Matthew Wolf</p>
            <a
              className="underline text-blue-500 hover:text-blue-400"
              href="https://github.com/wolfmatt233"
            >
              GitHub
            </a>
            <a
              className="underline text-blue-500 hover:text-blue-400"
              href="https://www.linkedin.com/in/matthew-wolf2"
            >
              LinkedIn
            </a>
          </footer>
        </div>
      </div>
    </PageContext.Provider>
  );
}

export default App;
