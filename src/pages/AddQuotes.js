import { Container } from "@mui/material";
import { appStyle } from "../AppSx";
import AddForm from "./components/AddForm";

export default function AddQuotes() {
  return (
    <Container sx={appStyle}>
      <AddForm />
    </Container>
  );
}
