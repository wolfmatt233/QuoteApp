import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { appStyle, createInput } from "../AppSx";
import AddForm from "./components/AddForm";

export default function AddQuotes() {
  return (
    <Container sx={appStyle}>
      <AddForm />
    </Container>
  );
}
