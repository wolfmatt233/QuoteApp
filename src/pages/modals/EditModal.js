import { useState } from "react";
import { signupContainer, modalStyle } from "../../AppSx";
import { auth, db } from "../../credentials";
import {
  Box,
  Button,
  InputAdornment,
  Modal,
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
    if (!quote) {
      setQuoteError(true);
      setQuoteErrorText("Enter a quote");
    } else if (!page) {
      setPageError(true);
      setPageErrorText("Enter a page");
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
      <Box sx={modalStyle}>
        <Box sx={signupContainer}>
          <Typography variant="h5">Edit Quote</Typography>
          <TextField
            InputLabelProps={{ shrink: true }}
            error={quoteError}
            helperText={quoteErrorText}
            sx={{ width: "500px", mt: "20px" }}
            defaultValue={props.quote}
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
            sx={{ width: "500px", mt: "20px" }}
            defaultValue={props.page}
            id="page"
            label="Page Number"
            variant="outlined"
            onChange={(e) => {
              setPage(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
          />
          <Button
            sx={{ width: "300px", mt: "20px" }}
            variant="contained"
            onClick={editQuote}
          >
            Update
          </Button>
          <Button
            sx={{ width: "300px", mt: "20px", bgcolor: "#808080" }}
            variant="contained"
            onClick={() => props.close()}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
