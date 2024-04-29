import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { appStyle } from "../AppSx";

export default function Home() {
  return (
    <Container sx={appStyle}>
      <Typography>Home</Typography>
    </Container>
  );
}
