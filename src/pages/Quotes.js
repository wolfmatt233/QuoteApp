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
    if (userDoc.data()) {
      setQuoteArr(userDoc.data().quotes);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <Container sx={appStyle}>
      <Paper sx={mainContainer}>
        <Typography variant="h5">Your Quotes</Typography>
        {quoteArr.map((quoteObj, idx) => {
          if (!quoteObj.type) {
            return (
              <QuoteBox
                bookId={quoteObj.book}
                quote={quoteObj.quote}
                page={quoteObj.page}
                key={idx}
              />
            );
          }

          if (quoteObj.type == "manual") {
            return (
              <QuoteBox
                type="manual"
                title={quoteObj.title}
                author={quoteObj.author}
                image={quoteObj.image}
                quote={quoteObj.quote}
                page={quoteObj.page}
                key={idx}
              />
            );
          }
        })}
      </Paper>
    </Container>
  );
}

//Access book via api: https://openlibrary.org/books/OL50987839M.json
//Image: https://covers.openlibrary.org/b/id/14595640-S.jpg

const mainContainer = {
  minHeight: "500px",
  p: "20px",
  position: "relative",
  bgcolor: "#284B63",
  borderRadius: "10px",
  minHeight: "93%",
  color: "#fff",
  mb: "40px",
};
