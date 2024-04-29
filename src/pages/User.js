import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { appStyle } from "../AppSx";

export default function User() {
  return (
    <Container sx={appStyle}>
      <Typography>User</Typography>
    </Container>
  );
}
