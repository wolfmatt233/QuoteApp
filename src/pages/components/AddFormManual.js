import { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../credentials";
import CloseIcon from "@mui/icons-material/Close";

export default function AddFormManual() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [quote, setQuote] = useState("");
  const [page, setPage] = useState("");

  //Error handling
  const [titleError, setTitleError] = useState(false);
  const [titleErrorText, setTitleErrorText] = useState("");
  const [authorError, setAuthorError] = useState(false);
  const [authorErrorText, setAuthorErrorText] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imageErrorText, setImageErrorText] = useState("");
  const [quoteError, setQuoteError] = useState(false);
  const [quoteErrorText, setQuoteErrorText] = useState("");
  const [pageError, setPageError] = useState(false);
  const [pageErrorText, setPageErrorText] = useState("");
  const [alertToggle, setAlertToggle] = useState(false);

  const clearErrors = () => {
    setTitleError(false);
    setTitleErrorText("");
    setAuthorError(false);
    setAuthorErrorText("");
    setImageError(false);
    setImageErrorText("");
    setQuoteError(false);
    setQuoteErrorText("");
    setPageError(false);
    setPageErrorText("");
  };

  const isValidUrl = () => {
    const img = new Image();
    img.src = image;

    img.onerror = () => {
      setImageError(true);
      setImageErrorText("Invalid image url.");
    };
  };

  const addQuote = async () => {
    clearErrors();
    if (!title) {
      setTitleError(true);
      setTitleErrorText("Enter a title");
    } else if (!author) {
      setAuthorError(true);
      setAuthorErrorText("Enter an author");
    } else if (!image) {
      setImageError(true);
      setImageErrorText("Add an image url.");
    } else if (!quote) {
      setQuoteError(true);
      setQuoteErrorText("Enter a quote");
    } else if (!page) {
      setPageError(true);
      setPageErrorText("Enter a page number");
    } else if (imageError == false) {
      await updateDoc(doc(db, "QuotesDB", auth.currentUser.uid), {
        quotes: arrayUnion({
          title: title,
          author: author,
          image: image,
          quote: quote,
          page: page,
          id: uuidv4(),
          type: "manual",
        }),
      }).then(() => {
        setTitle("");
        setAuthor("");
        setImage("");
        setQuote("");
        setPage("");
        setAlertToggle(true);
      });
    }
  };

  return (
    <Paper sx={addPaper} elevation={6}>
      <Collapse in={alertToggle} sx={{ mb: "10px" }}>
        <Alert
          severity="success"
          variant="outlined"
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => {
                setAlertToggle(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          }
        >
          Quote Added.
        </Alert>
      </Collapse>
      <Typography variant="h5">Add a Quote Manually</Typography>

      <TextField
        sx={addInput}
        id="title"
        label="Book Title"
        variant="outlined"
        error={titleError}
        helperText={titleErrorText}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <TextField
        sx={addInput}
        id="author"
        label="Book Author"
        variant="outlined"
        error={authorError}
        helperText={authorErrorText}
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />

      <TextField
        sx={addInput}
        id="image"
        label="Cover Image"
        variant="outlined"
        error={imageError}
        helperText={imageErrorText}
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />

      <TextField
        sx={addInput}
        multiline
        rows={4}
        id="quote"
        label="Quote"
        variant="outlined"
        error={quoteError}
        helperText={quoteErrorText}
        value={quote}
        onChange={(e) => {
          setQuote(e.target.value);
        }}
      />

      <TextField
        sx={addInput}
        id="pageNum"
        label="Page Number"
        variant="outlined"
        error={pageError}
        helperText={pageErrorText}
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
        value={page}
        onChange={(e) => {
          setPage(e.target.value);
        }}
      />
      <Button variant="contained" sx={addBtn} onClick={addQuote}>
        Add Quote
      </Button>
    </Paper>
  );
}

const addInput = {
  width: "100%",
  mt: "15px",
};

const addBtn = {
  mt: "15px",
};

const addPaper = {
  p: "15px",
  display: "flex",
  flexDirection: "column",
};
