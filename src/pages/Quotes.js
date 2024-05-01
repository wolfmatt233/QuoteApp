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
//Access book via api: https://openlibrary.org/books/OL50987839M.json
//Image: https://covers.openlibrary.org/b/id/14595640-S.jpg
