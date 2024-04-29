import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { appStyle } from "../AppSx";

export default function AddQuotes() {
  return (
    <Container sx={appStyle}>
      <Typography>Add Quotes</Typography>
    </Container>
  );
}
