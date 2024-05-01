import { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { appStyle } from "../AppSx";
import hero from "../images/homehero.jpg";

export default function Home() {
  return (
    <Container sx={appStyle}>
      <Paper sx={homeHero} elevation={4}>
        <Typography variant="h4" sx={heroTitle}>
          Welcome To MyQuotes!
        </Typography>
        <Box sx={heroContainer}>
          <Paper sx={heroInfo} elevation={6}>
            <div style={bookline} />
            <div style={booktitle}></div>
            <div style={booktitle2}></div>
            <div style={bookpages}></div>
            <Typography sx={bookwords}>Create an account</Typography>
          </Paper>
          <Paper sx={heroInfo} elevation={6}>
            <div style={bookline} />
            <div style={booktitle}></div>
            <div style={booktitle2}></div>
            <div style={bookpages}></div>
            <Typography sx={bookwords}>
              Keep track of quotes from your favorite books
            </Typography>
          </Paper>
          <Paper sx={heroInfo} elevation={6}>
            <div style={bookline} />
            <div style={booktitle}></div>
            <div style={booktitle2}></div>
            <div style={bookpages}></div>
            <Typography sx={bookwords}>Share your quotes</Typography>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
}

const homeHero = {
  height: "500px",
  p: "20px",
  textAlign: "center",
  position: "relative",
};

const heroTitle = {
  mt: "20px",
  color: "#191919",
};

const heroContainer = {
  position: "absolute",
  width: "100%",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

// Credit to Poulami Chakraborty for the book inspiration: https://codepen.io/poulamic/pen/RwrKqmb

const heroInfo = {
  p: "15px",
  pr: "20px",
  bgcolor: "#664E4C",
  height: "250px",
  display: "flex",
  width: "170px",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  color: "#fff",
  overflow: "hidden",
  borderRadius: "15px 10px 10px 15px",
};

const bookline = {
  height: "100%",
  position: "absolute",
  left: "0%",
  width: "20px",
  backgroundColor: "#473635",
  borderRight: "2px solid #473635",
};

const bookpages = {
  height: "20px",
  position: "absolute",
  width: "98%",
  right: "0%",
  bottom: "1%",
  backgroundColor: "#fff",
  borderRadius: "50px 0px 0px 50px",
};

const booktitle = {
  height: "10px",
  position: "absolute",
  width: "80px",
  top: "13%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#E2D58B",
  borderRadius: "10px",
  boxShadow:
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
};

const booktitle2 = {
  height: "10px",
  position: "absolute",
  width: "80px",
  top: "20%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#E2D58B",
  borderRadius: "10px",
  boxShadow:
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
};

const bookwords = {
  ml: "20px",
};
