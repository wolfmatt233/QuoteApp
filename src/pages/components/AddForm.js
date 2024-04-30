import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function AddForm() {
  const [query, setQuery] = useState("");
  const [apiRes, setApiRes] = useState([]);
  const [inputLoading, setInputLoading] = useState(false);
  const [book, setBook] = useState("");
  const [quote, setQuote] = useState("");
  const [page, setPage] = useState("");

  const defprops = {
    options: apiRes,
    loading: inputLoading,
    getOptionLabel: (options) => options.title + " - " + options.author_name,
  };

  const handleSearch = (e) => {
    setBook(e.target.id);

    setInputLoading(true);
    const myTimeout = setTimeout(() => {
      setQuery(e.target.value);
    }, 3000);
  };

  useEffect(() => {
    fetch(`https://openlibrary.org/search.json?q=${query}&limit=20`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response.docs);
        response.docs.forEach((book, idx) => {
          book.idx = idx;
        });
        setApiRes(response.docs);
        setInputLoading(false);
      });
  }, [query]);

  const addQuote = () => {
    console.log(book, quote, page)
  };

  // Add book: Dropdown to select from API
  // Use search API: https://openlibrary.org/search.json?q=before+they+are+hanged
  // Use json from search to display:
  //Image: https://covers.openlibrary.org/b/id/14595640-S.jpg
  //Author name: author_name[0]
  //Store OLID to gather info later via books api: https://openlibrary.org/books/OL50987839M.json

  return (
    <Paper sx={addPaper} elevation={6}>
      <Typography variant="h5">Add a Quote</Typography>
      <Autocomplete
        disablePortal
        clearOnBlur={false}
        {...defprops}
        sx={addInput}
        onInputChange={handleSearch}
        filterOptions={(x) => x}
        renderInput={(params) => <TextField {...params} label="Book" />}
        renderOption={(props, option) => {
          return (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              id={option.cover_edition_key}
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
        sx={addInput}
        multiline
        rows={4}
        id="quote"
        label="Quote"
        variant="outlined"
        onChange={(e) => {
          setQuote(e.target.value);
        }}
      />

      <TextField
        sx={addInput}
        id="pageNum"
        label="Page Number"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
        onChange={(e) => {
          setPage(e.target.value);
        }}
      />
      <Button variant="contained" sx={addInput} onClick={addQuote}>
        Add Quote
      </Button>
    </Paper>
  );
}

const addInput = {
  width: "100%",
  mt: "15px",
};

const addPaper = {
  p: "15px",
  display: "flex",
  flexDirection: "column",
};
