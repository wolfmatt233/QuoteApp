import { useEffect, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { appStyle } from "../AppSx";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../credentials";
import QuoteBox from "./components/QuoteBox";

export default function Quotes() {
  const [quoteArr, setQuoteArr] = useState([]);

  const getQuotes = async () => {
    const userDoc = await getDoc(doc(db, "QuotesDB", auth.currentUser.uid));
    setQuoteArr(userDoc.data().quotes);
    console.log(quoteArr);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    console.log(quoteArr);
  }, [quoteArr]);

  return (
    <Container sx={appStyle}>
      <Paper sx={mainContainer}>
        <Typography variant="h5">Your Quotes</Typography>
        {quoteArr.map((quoteObj, idx) => {
          return (
            <QuoteBox
              bookId={quoteObj.book}
              quote={quoteObj.quote}
              page={quoteObj.page}
              key={idx}
            />
          );
        })}
      </Paper>
    </Container>
  );
}
//Access book via api: https://openlibrary.org/books/OL50987839M.json
//Image: https://covers.openlibrary.org/b/id/14595640-S.jpg

const mainContainer = {
  height: "500px",
  p: "20px",
  position: "relative",
  bgcolor: "#284B63",
  borderRadius: "10px",
  minHeight: "93%",
  color: "#fff",
};
