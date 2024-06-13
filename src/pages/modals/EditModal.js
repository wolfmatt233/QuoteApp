import { useEffect, useState } from "react";
import { createInput, modalStyle, signupBtn } from "../../AppSx";
import { auth, db } from "../../credentials";
import {
  Button,
  InputAdornment,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditModal(props) {
  const [quote, setQuote] = useState("");
  const [page, setPage] = useState("");
  const [quoteError, setQuoteError] = useState(false);
  const [quoteErrorText, setQuoteErrorText] = useState("");
  const [pageError, setPageError] = useState(false);
  const [pageErrorText, setPageErrorText] = useState("");

  const clearErrors = () => {
    setQuoteError(false);
    setQuoteErrorText("");
    setPageError(false);
    setPageErrorText("");
  };

  const editQuote = async () => {
    clearErrors();
    if(!quote) {
      setQuoteError(true);
      setQuoteErrorText("Enter a quote");
    } else if (isNaN(page)) {
      setPageError(true);
      setPageErrorText("Enter a number");
    } else {
      const ref = doc(db, "QuotesDB", auth.currentUser.uid);
      let userDoc = await getDoc(ref);
      userDoc = userDoc.data();

      userDoc.quotes.forEach((q) => {
        if (q.id == props.targetId) {
          q.quote = quote;
          q.page = page;
        }
      });

      await updateDoc(ref, {
        quotes: userDoc.quotes,
      }).then(() => {
        props.close();
        props.openSnack();
        props.snackMsg();
        props.setArr(userDoc.quotes);
      });
    }
  };

  useEffect(() => {
    setPage(props.page);
    setQuote(props.quote);
  }, []);

  return (
    <Modal
      open={props.toggle}
      onClose={() => {
        props.close();
        props.resetTarget();
        setQuote("");
        setPage("");
      }}
    >
      <Paper sx={modalStyle}>
        <Typography variant="h5" sx={{ mb: "10px" }}>
          Edit Quote
        </Typography>
        <TextField
          InputLabelProps={{ shrink: true }}
          error={quoteError}
          helperText={quoteErrorText}
          sx={createInput}
          defaultValue={quote}
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
          error={pageError}
          helperText={pageErrorText}
          sx={createInput}
          defaultValue={page}
          id="page"
          type="number"
          label="Page Number (optional)"
          variant="outlined"
          onChange={(e) => {
            setPage(e.target.value);
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
        />
        <Button
          sx={signupBtn}
          variant="contained"
          color="primary"
          onClick={editQuote}
        >
          Update
        </Button>
        <Button sx={signupBtn} variant="outlined" onClick={() => props.close()}>
          Cancel
        </Button>
      </Paper>
    </Modal>
  );
}
