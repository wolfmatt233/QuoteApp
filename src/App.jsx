import { useEffect, useState, useContext } from "react";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./pages/components/navigation/NavBar";
import Menu from "./pages/components/navigation/Menu";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import useMenuToggle from "./pages/functions/useMenuToggle";
import { signOut } from "firebase/auth";
import { auth } from "./credentials";
import User from "./pages/User";
import Context from "./context/ContextProvider";
import AddQuote from "./pages/AddQuote";
import ViewQuotes from "./pages/ViewQuotes";

function App() {
  const { user, userDoc, loading } = useContext(Context);
  const [page, setPage] = useState(<Home />);

  const pages = {
    home: <Home setPage={setPage} />,
    login: <Login setPage={setPage} />,
    signup: <SignUp setPage={setPage} />,
    user: <User />,
    add: <AddQuote />,
    view: <ViewQuotes setPage={setPage} />,
  };
  pages.home = <Home setPage={setPage} pages={pages} />;

  const { menuToggle, closeMenu, burgerToggle, handleBurger } = useMenuToggle();

  useEffect(() => {
    setPage(pages.home);
  }, [user]);

  useEffect(() => {
    closeMenu();
  }, [page]);

  const logout = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <i className="fas fa-circle-notch fa-spin mt-2 text-5xl absolute top-1/3 left-1/2 translate-y-[-50%] translate-x-[-50%] text-black"></i>
    );
  }

  return (
    <div className="relative bg-gray-100">
      <Menu
        setPage={setPage}
        menuToggle={menuToggle}
        pages={pages}
        user={user}
        logout={logout}
      />
      <Navbar
        handleBurger={handleBurger}
        burgerToggle={burgerToggle}
        setPage={setPage}
        pages={pages}
        userDoc={userDoc}
      />

      <div className="mx-auto px-11 py-7 max-w-screen-xl max-sm:px-0">
        <div className="min-h-[calc(100vh-144px)] rounded-lg bg-white border-gray-300 border-[1px] p-5 max-sm:px-2">
          {page}
        </div>
      </div>

      <div className="footer-shadow">
        <footer className="text-center m-auto max-w-screen-xl h-10 flex items-center justify-around">
          <p>&copy;Matthew Wolf</p>
          <a className="underline" href="https://github.com/wolfmatt233">
            GitHub
          </a>
          <a className="underline" href="www.linkedin.com/in/matthew-wolf2">
            LinkedIn
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
