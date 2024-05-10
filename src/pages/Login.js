import { useEffect, useState } from "react";
import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { appStyle, createInput, signupContainer, signupBtn } from "../AppSx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../credentials";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const signIn = () => {
    setInputError(false);
    setErrorText("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //go home
      })
      .catch((error) => {
        let code = error.code.split("/")[1].replace("-", " ");
        code = code.charAt(0).toUpperCase() + code.slice(1);
        setInputError(true);
        setErrorText(code);
      });
  };

  return (
    <Container sx={appStyle}>
      <Box sx={signupContainer}>
        <Typography variant="h5">Log In</Typography>

        <TextField
          error={inputError}
          sx={createInput}
          id="email"
          label="Email"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
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
            setPassword(e.target.value);
          }}
        />
        <Button sx={{ mt: "15px", width: "300px" }} variant="contained" onClick={signIn}>
          Sign In
        </Button>
      </Box>
    </Container>
  );
}
