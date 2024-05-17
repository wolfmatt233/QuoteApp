import { useState } from "react";
import { Box, Button, TextField, Typography, Modal, Paper } from "@mui/material";
import {
  createInput,
  modalContainer,
  signupBtn,
  modalStyle,
} from "../../AppSx";
import { EmailAuthProvider } from "firebase/auth/cordova";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { auth, db } from "../../credentials";
import { deleteDoc, doc } from "firebase/firestore";

export default function DeleteModal(props) {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const reauthenticate = () => {
    let credential = EmailAuthProvider.credential(
      confirmEmail,
      confirmPassword
    );

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        deleteAccount();
      })
      .catch((error) => {
        let code = error.code.split("/")[1].replace("-", " ");
        code = code.charAt(0).toUpperCase() + code.slice(1);
        setInputError(true);
        setErrorText(code);
      });
  };

  const deleteAccount = () => {
    const uid = auth.currentUser.uid;

    deleteUser(auth.currentUser).then(async () => {
      await deleteDoc(doc(db, "QuotesDB", uid))
        .then(() => {
          props.close();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <Modal
      open={props.toggle}
      onClose={() => {
        setInputError(false);
        setErrorText("");
        props.close();
      }}
    >
      <Paper sx={modalStyle}>
          <Typography variant="h5" sx={{mb:"10px"}}>Log In To Confirm</Typography>
          <TextField
            error={inputError}
            sx={createInput}
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setConfirmEmail(e.target.value);
            }}
          />
          <TextField
            error={inputError}
            helperText={errorText}
            sx={createInput}
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <Button sx={signupBtn} variant="contained" onClick={reauthenticate}>
            Delete Account
          </Button>
        </Paper>
    </Modal>
  );
}
