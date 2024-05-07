import { Button, Container, Paper, Typography } from "@mui/material";
import { appStyle } from "../AppSx";
import AddForm from "./components/AddForm";
import AddFormManual from "./components/AddFormManual";
import { useEffect, useState } from "react";

export default function AddQuotes() {
  const pages = {
    api: <AddForm />,
    manual: <AddFormManual />,
  };
  const [curPage, setCurPage] = useState(pages.api);
  const [checkPage, setCheckPage] = useState("api");
  const [changeText, setChangeText] = useState(
    "Can't find a book? Try it maually."
  );
  const [buttonText, setButtonText] = useState("Add Quote Manually");

  const changePage = () => {
    if (checkPage == "api") {
      setCurPage(pages.manual);
      setCheckPage("manual");
      setButtonText("Go Back");
      setChangeText("Go back to regular search here.");
    } else if (checkPage == "manual") {
      setCurPage(pages.api);
      setCheckPage("api");
      setButtonText("Add Quote Manually");
      setChangeText("Can't find a book? Try it maually.");
    }
  };

  return (
    <Container sx={appStyle}>
      {curPage}
      <Paper sx={{ p: "10px", mt: "20px", mb: "40px" }}>
        <Typography>{changeText}</Typography>
        <Button onClick={changePage}>{buttonText}</Button>
      </Paper>
    </Container>
  );
}
