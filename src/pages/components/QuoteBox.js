import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Height } from "@mui/icons-material";

export default function QuoteBox(props) {
  const [bookDetails, setBookDetails] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");

  useEffect(() => {
    fetch(`https://openlibrary.org/books/${props.bookId}.json`)
      .then((response) => response.json())
      .then((response) => {
        setBookDetails(response);
        setTitle(response.title);
        setCover(response.covers[0]);
        console.log("Book fetched");
      });
  }, [props]);

  useEffect(() => {
    if (bookDetails.length != "") {
      fetch(`https://openlibrary.org${bookDetails.authors[0].key}.json`)
        .then((response) => response.json())
        .then((response) => {
          setAuthor(response.name);
          console.log("Author fetched");
        });
    }
  }, [bookDetails]);

  return (
    <Paper sx={quotePaper}>
      <Box
        component="img"
        src={`https://covers.openlibrary.org/b/id/${cover}-L.jpg`}
        sx={coverImage}
      />
      <Box>
        <Typography>
          {title} by {author}
        </Typography>
        <Typography>{props.quote}</Typography>
        <Typography>{props.page}</Typography>
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
  width: "15%",
  mr: "20px",
};
