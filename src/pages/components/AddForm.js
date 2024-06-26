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
import { addPaper } from "../../AppSx";

export default function AddForm() {
  const [query, setQuery] = useState("");
  const [apiRes, setApiRes] = useState([]);
  const [inputLoading, setInputLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [book, setBook] = useState("");
  const [quote, setQuote] = useState("");
  const [page, setPage] = useState("");

  //error handling
  const [searchError, setSearchError] = useState(false);
  const [searchErrorText, setSearchErrorText] = useState("");
  const [quoteError, setQuoteError] = useState(false);
  const [quoteErrorText, setQuoteErrorText] = useState("");
  const [pageError, setPageError] = useState(false);
  const [pageErrorText, setPageErrorText] = useState("");
  const [alertToggle, setAlertToggle] = useState(false);

  const handleSearch = (e) => {
    setInputLoading(true);
    if (e != null) {
      setQuery(e.target.value);
      setBook(e.target.id);
    }
  };

  const handleSelect = (e, val, reason) => {
    if (val != null) {
      setSelected(val);
    }
    if (reason == "clear") {
      setSelected("");
    }
  };

  useEffect(() => {
    if (query == "") {
      setApiRes([]);
      setInputLoading(false);
    } else {
      const getData = setTimeout(() => {
        fetch(`https://openlibrary.org/search.json?q=${query}`)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            response.docs.forEach((book, idx) => {
              book.idx = idx;
            });
            setApiRes(response.docs);
            setInputLoading(false);
          });
      }, 2000);
      return () => clearTimeout(getData);
    }
  }, [query]);

  const addQuote = async () => {
    setSearchError(false);
    setSearchErrorText("");
    setQuoteError(false);
    setQuoteErrorText("");
    setPageError(false);
    setPageErrorText("");
    if (!selected) {
      setSearchError(true);
      setSearchErrorText("Choose a Book");
    } else if (!quote) {
      setQuoteError(true);
      setQuoteErrorText("Enter a quote");
    } else if (isNaN(page)) {
      setPageError(true);
      setPageErrorText("Enter a number");
    } else {
      await updateDoc(doc(db, "QuotesDB", auth.currentUser.uid), {
        quotes: arrayUnion({
          book: book,
          quote: quote,
          page: page,
          id: uuidv4(),
        }),
      }).then(() => {
        setSelected("");
        setBook("");
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
      <Typography variant="h5">Add a Quote</Typography>
      <Autocomplete
        disablePortal
        clearOnBlur={false}
        options={apiRes}
        loading={inputLoading}
        getOptionLabel={(options) => {
          if (options == "") {
            return "";
          } else {
            return options.title + " - " + options.author_name;
          }
        }}
        sx={{ mt: "15px" }}
        value={selected}
        onChange={handleSelect}
        id="bookAutocomplete"
        onInputChange={handleSearch}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Book"
            helperText={searchErrorText}
            error={searchError}
          />
        )}
        renderOption={(props, option) => {
          let id = option.key.split("/")[2]
          return (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              id={id}
              key={option.idx}
            >
              <img
                src={`https://covers.openlibrary.org/b/id/${option.cover_i}-S.jpg`}
              />
              {option.title} {" - "} {option.author_name}
            </Box>
          );
        }}
      />

      <TextField
        sx={{ mt: "15px" }}
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
        sx={{ mt: "15px" }}
        id="pageNum"
        label="Page Number (optional)"
        variant="outlined"
        type="number"
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
      <Button variant="contained" sx={{ mt: "15px" }} onClick={addQuote}>
        Add Quote
      </Button>
    </Paper>
  );
}

