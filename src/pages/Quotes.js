import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { appStyle } from "../AppSx";

export default function Quotes() {
  return (
    <Container sx={appStyle}>
        <Typography>Quotes</Typography>
    </Container>
  );
}
