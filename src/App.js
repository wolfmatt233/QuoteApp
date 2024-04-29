import {
  AppBar,
  Box,
  Button,
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
      <AppBar component="nav" sx={{ bgcolor: "#d9dbf1" }}>
        <Container sx={{ maxWidth: "1000px" }}>
          <Toolbar disableGutters>
            <MenuBookIcon sx={{color:"#000", mr:"5px"}}/>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                color: "#000",
                cursor: "pointer",
                display: { xs: "none", sm: "block" },
              }}
              onClick={() => setCurPage(pages.home)}
            >
              MyQuotes
            </Typography>
            {userButtons == false ? (
              <Box>
                <Button
                  sx={{ color: "#000" }}
                  onClick={() => setCurPage(pages.login)}
                >
                  Login
                </Button>
                <Button
                  sx={{ color: "#000" }}
                  onClick={() => setCurPage(pages.signup)}
                >
                  Create Account
                </Button>
              </Box>
            ) : (
              <Box>
                <Button
                  sx={{ color: "#000" }}
                  onClick={() => setCurPage(pages.addQuotes)}
                >
                  Add Quotes
                </Button>
                <Button
                  sx={{ color: "#000" }}
                  onClick={() => setCurPage(pages.quotes)}
                >
                  Your Quotes
                </Button>
                <Button
                  sx={{ color: "#000" }}
                  onClick={() => setCurPage(pages.user)}
                >
                  Account
                </Button>
                <Button sx={{ color: "#000" }} onClick={logOut}>
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

const buttonsContainer = {
  maxWidth: "100%",
};

export default App;
