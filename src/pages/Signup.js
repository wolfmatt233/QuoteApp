import { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { appStyle, createInput, signupContainer, signupBtn } from "../AppSx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../credentials";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [uName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState("");

  const signUp = () => {
    if (password != checkPass) {
      setPasswordError(true);
      setInputErrorText("Passwords must match!");
      return;
    }
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log("Created", userCredential.user.uid);
          let userDoc = {
            uid: userCredential.user.uid,
            username: uName,
            quotes: [],
          };

          addUserDoc(userDoc);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addUserDoc = async (userDoc) => {
    try {
      await setDoc(doc(db, "QuotesDB", userDoc.uid), userDoc);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={appStyle}>
      <Box sx={signupContainer}>
        <Typography variant="h5">Sign Up</Typography>
        <TextField
          sx={createInput}
          id="uName"
          label="Username"
          variant="outlined"
          onChange={(e) => {
            setUName(e.target.value);
          }}
        />
        <TextField
          sx={createInput}
          id="email"
          label="Email"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          error={passwordError}
          sx={createInput}
          id="password"
          label="Password"
          variant="outlined"
          secur
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          error={passwordError}
          sx={createInput}
          id="checkPass"
          label="Confirm Password"
          helperText={inputErrorText}
          variant="outlined"
          type="password"
          onChange={(e) => {
            setCheckPass(e.target.value);
          }}
        />
        <Button sx={signupBtn} variant="contained" onClick={signUp}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
