import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { appStyle } from "../AppSx";
import { auth, db } from "../credentials";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import PasswordModal from "./components/PasswordModal";
import DeleteModal from "./components/DeleteModal";

export default function User() {
  const [userDoc, setUserDoc] = useState();
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [alert, setAlert] = useState("");
  const [nameToggle, setNameToggle] = useState(true);
  const [toggleModal, setToggleModal] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [editText, setEditText] = useState("Edit");
  const closePassword = () => setTogglePassword(false);
  const openPassword = () => setTogglePassword(true);
  const closeModal = () => setToggleModal(false);
  const openModal = () => setToggleModal(true);

  const getUser = async () => {
    const userDoc = await getDoc(doc(db, "QuotesDB", auth.currentUser.uid));
    setUserDoc(userDoc);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userDoc) {
      setUsername(userDoc.data().username);
    }
  }, [userDoc]);

  const changeUsername = async () => {
    await updateDoc(doc(db, "QuotesDB", auth.currentUser.uid), {
      username: newUsername,
    }).then(() => {
      setAlert(
        <Alert severity="success" variant="outlined">
          Username successfully changed.
        </Alert>
      );
      setNameToggle(true);
      setEditText("Edit");
      getUser();
    });
  };

  return (
    <Container sx={appStyle}>
      <Paper elevation={1} sx={{ p: "10px", mb: "10px" }}>
        <Typography variant="h5">{username}</Typography>
      </Paper>
      <Paper elevation={6} sx={paperContainer}>
        <Box sx={boxContainer}>
          <TextField
            variant="outlined"
            label="New Username"
            disabled={nameToggle}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ ml: "10px", height: "56px" }}
            disabled={nameToggle}
            onClick={changeUsername}
          >
            Confirm
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            if (editText === "Edit") {
              setNameToggle(false);
              setEditText("Cancel");
            } else if (editText === "Cancel") {
              setNameToggle(true);
              setEditText("Edit");
            }
          }}
        >
          {editText}
        </Button>
      </Paper>
      <Paper elevation={6} sx={paperContainer}>
        <Typography>Change Password</Typography>
        <Button variant="contained" onClick={openPassword}>
          Change
        </Button>
      </Paper>
      <Paper elevation={6} sx={paperContainer}>
        <Typography>Delete Account</Typography>
        <Button variant="contained" onClick={openModal}>
          Confirm
        </Button>
      </Paper>
      {alert}
      <DeleteModal toggle={toggleModal} close={closeModal} />
      <PasswordModal
        toggle={togglePassword}
        close={closePassword}
        setAlert={setAlert}
      />
    </Container>
  );
}

const paperContainer = {
  p: "10px",
  mb: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const boxContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
