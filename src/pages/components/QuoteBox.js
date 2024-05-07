import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import "@fontsource-variable/caveat";
import "@fontsource-variable/comfortaa";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function QuoteBox(props) {
  const [bookDetails, setBookDetails] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");

  useEffect(() => {
    if (!props.type) {
      fetch(`https://openlibrary.org/books/${props.bookId}.json`)
        .then((response) => response.json())
        .then((response) => {
          setBookDetails(response);
          setTitle(response.title);
          setCover(
            `https://covers.openlibrary.org/b/id/${response.covers[0]}-L.jpg`
          );
        });
    } else if (props.type == "manual") {
      setCover(props.image);
      setTitle(props.title);
      setAuthor(props.author);
    }
  }, [props]);

  useEffect(() => {
    if (!props.type) {
      if (bookDetails.length != "") {
        fetch(`https://openlibrary.org${bookDetails.authors[0].key}.json`)
          .then((response) => response.json())
          .then((response) => {
            setAuthor(response.name);
          });
      }
    }
  }, [bookDetails]);

  return (
    <Paper sx={quotePaper}>
      <Box
        component="img"
        src={cover}
        sx={coverImage}
      />
      <Box sx={quoteInfo}>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: "20px" }}>{title}</Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", mt: "3px" }}>
            {" "}
            by {author}
          </Typography>
        </Box>
        <Box sx={quote}>
          <FormatQuoteIcon sx={{ transform: "rotate(180deg)" }} />
          <Typography
            fontFamily="Caveat Variable"
            sx={{ textAlign: "left", p: "0 24px", fontSize: "20px" }}
          >
            {props.quote}
          </Typography>
          <FormatQuoteIcon sx={{ alignSelf: "flex-end" }} />
          <div style={triangle}></div>
        </Box>
        <Typography sx={{ alignSelf: "flex-end", mt: "5px" }}>
          Page {props.page}
        </Typography>
      </Box>
    </Paper>
  );
}

const quotePaper = {
  mt: "20px",
  p: "10px",
  display: "flex",
};

const coverImage = {
  height: "150px",
  mr: "20px",

  borderRadius: "3px",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
};

const quoteInfo = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const quote = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #000",
  borderRadius: "10px",
  margin: "10px 0",
  p: "5px",
  position: "relative",
};

const triangle = {
  position: "absolute",
  bottom: "-9px",
  right: "30px",
  width: "0px",
  height: "0px",
  borderStyle: "solid",
  borderWidth: "0 10px 10px 10px",
  borderColor: "transparent transparent #000 transparent",
  transform: "rotate(45deg)",
};
