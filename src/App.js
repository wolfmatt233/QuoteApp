import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Container,
  Drawer,
  IconButton,
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
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./assets/logo.png";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "@fontsource-variable/comfortaa";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

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
  const [drawerToggle, setDrawerToggle] = useState(false);

  const handleDrawer = () => setDrawerToggle((prev) => !prev);

  const logOut = () => {
    signOut(auth).catch((error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    setDrawerToggle(false);
  }, [curPage]);

  return (
    <Box>
      <AppBar component="nav" sx={{ bgcolor: "#fff" }}>
        <Container sx={{ maxWidth: "1000px" }}>
          <Toolbar disableGutters sx={navSplit}>
            <ButtonBase onClick={() => setCurPage(pages.home)}>
              <Box
                component="img"
                src={Logo}
                sx={{ width: "35px", mr: "5px" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                fontFamily="Comfortaa Variable"
                sx={{ color: "#000" }}
              >
                QuoteScribe
              </Typography>
            </ButtonBase>
            <IconButton
              sx={{ display: { sm: "block", md: "none" } }}
              onClick={handleDrawer}
            >
              <MenuIcon />
            </IconButton>
            {userButtons == false ? (
              <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                <Button sx={navBtn} onClick={() => setCurPage(pages.login)}>
                  Login
                  <LoginIcon sx={{ ml: "5px", fontSize: "15px" }} />
                </Button>
                <Button sx={navBtn} onClick={() => setCurPage(pages.signup)}>
                  Create Account
                  <PersonAddAltIcon sx={{ ml: "5px", fontSize: "15px" }} />
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                <Button
                  sx={navBtn}
                  onClick={() => {
                    setCurPage(pages.addQuotes);
                  }}
                >
                  <AddIcon sx={{ mr: "5px", fontSize: "15px" }} />
                  Add a Quote
                </Button>
                <Button
                  sx={navBtn}
                  onClick={() => {
                    setCurPage(pages.quotes);
                  }}
                >
                  <BookmarkIcon sx={{ mr: "5px", fontSize: "15px" }} />
                  Your Quotes
                </Button>
                <Button
                  sx={navBtn}
                  onClick={() => {
                    setCurPage(pages.user);
                  }}
                >
                  <AccountCircleIcon sx={{ mr: "5px", fontSize: "20px" }} />
                  Account
                </Button>
                <Button sx={navBtn} onClick={logOut}>
                  Log Out
                  <LogoutIcon sx={{ ml: "5px", fontSize: "15px" }} />
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerToggle}
        onClose={handleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {userButtons == false ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              sx={drawerBtn}
              onClick={() => {
                setCurPage(pages.addQuotes);
              }}
            >
              <AddIcon sx={{ mr: "5px", fontSize: "15px" }} />
              Add a Quote
            </Button>
            <Button
              sx={drawerBtn}
              onClick={() => {
                setCurPage(pages.quotes);
              }}
            >
              <BookmarkIcon sx={{ mr: "5px", fontSize: "15px" }} />
              Your Quotes
            </Button>
            <Button
              sx={drawerBtn}
              onClick={() => {
                setCurPage(pages.user);
              }}
            >
              <AccountCircleIcon sx={{ mr: "5px", fontSize: "20px" }} /> Account
            </Button>
            <Button sx={drawerBtn} onClick={logOut}>
              Log Out
              <LogoutIcon sx={{ ml: "5px", fontSize: "15px" }} />
            </Button>
          </Box>
        )}
      </Drawer>
      {curPage}
    </Box>
  );
}

const navSplit = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const navBtn = {
  color: "#6d737f",
  borderRadius: "0px",
  borderBottom: "1px solid transparent",
  "&:hover": {
    borderBottom: "1px solid #000",
  },
};

const drawerBtn = {
  color: "#6d737f",
  height: "50px",
  borderBottom: "1px solid #000",
  borderRadius: "0px",
  "&:hover": {
    backgroundColor: "#253a54",
    color: "#fff",
  },
};

export default App;
