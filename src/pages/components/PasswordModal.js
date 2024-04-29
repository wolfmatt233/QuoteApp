import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Alert,
} from "@mui/material";
import {
  createInput,
  signupContainer,
  signupBtn,
  modalStyle,
} from "../../AppSx";
import { EmailAuthProvider } from "firebase/auth/cordova";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../../credentials";

export default function DeleteModal(props) {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const reauthenticate = () => {
    let credential = EmailAuthProvider.credential(
      confirmEmail,
      confirmPassword
    );

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        changePassword();
      })
      .catch((error) => {
        let code = error.code.split("/")[1].replace("-", " ");
        code = code.charAt(0).toUpperCase() + code.slice(1);
        setInputError(true);
        setErrorText(code);
      });
  };

  const changePassword = () => {
    updatePassword(auth.currentUser, newPassword).then(() => {
      props.close();
      props.setAlert(
        <Alert severity="success" variant="outlined">Password successfully changed.</Alert>
      );
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
      <Box sx={modalStyle}>
        <Box sx={signupContainer}>
          <Typography variant="h5">Log In To Confirm</Typography>
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
          <TextField
            sx={createInput}
            id="password"
            label="New Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <Button sx={signupBtn} variant="contained" onClick={reauthenticate}>
            Change Password
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
