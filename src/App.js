import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AddQuotes from "./pages/AddQuotes";
import Quotes from "./pages/Quotes";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./credentials";
import User from "./pages/User";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "./assets/logo.png";
import "@fontsource-variable/comfortaa";

function App() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurPage(pages.home);
      if (user) {
        setUserButtons(true);
      } else {
        setUserButtons(false);
      }
    });
  }, []);

  const pages = {
    home: <Home />,
    login: <Login />,
    signup: <Signup />,
    quotes: <Quotes />,
    addQuotes: <AddQuotes />,
    user: <User />,
  };
  const [curPage, setCurPage] = useState(pages.home);
  const [userButtons, setUserButtons] = useState(false);

  const logOut = () => {
    signOut(auth).catch((error) => {
      console.log(error.message);
    });
  };

  return (
    <Box>
      <AppBar component="nav" sx={{ bgcolor: "#fff" }}>
        <Container sx={{ maxWidth: "1000px" }}>
          <Toolbar disableGutters sx={navSplit}>
            <ButtonBase onClick={() => setCurPage(pages.home)}>
              <Box
                component="img"
                src={Logo}
                sx={{ width: "40px", mr: "5px" }}
              />
              <Typography
                variant="h5"
                noWrap
                component="div"
                fontFamily="Comfortaa Variable"
                sx={{
                  flexGrow: 1,
                  color: "#000",
                  cursor: "pointer",
                  display: { xs: "none", sm: "block" },
                }}
              >
                MyQuotes
              </Typography>
            </ButtonBase>
            {userButtons == false ? (
              <Box>
                <Button
                  sx={{ color: "#6d737f" }}
                  onClick={() => setCurPage(pages.login)}
                >
                  Login
                </Button>
                <Button
                  sx={{ color: "#6d737f" }}
                  onClick={() => setCurPage(pages.signup)}
                >
                  Create Account
                </Button>
              </Box>
            ) : (
              <Box>
                <Button
                  sx={{ color: "#6d737f" }}
                  onClick={() => {
                    setCurPage(pages.addQuotes);
                  }}
                >
                  Add a Quote
                </Button>
                <Button
                  sx={{ color: "#6d737f" }}
                  onClick={() => {
                    setCurPage(pages.quotes);
                  }}
                >
                  Your Quotes
                </Button>
                <Button
                  sx={{ color: "#6d737f" }}
                  onClick={() => {
                    setCurPage(pages.user);
                  }}
                >
                  Account
                </Button>
                <Button sx={{ color: "#6d737f" }} onClick={logOut}>
                  Log Out
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {curPage}
    </Box>
  );
}

const navSplit = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default App;
