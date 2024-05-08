import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Container,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { appStyle } from "../AppSx";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../credentials";
import QuoteBox from "./components/QuoteBox";
import DeleteQModal from "./modals/DeleteQModal";

export default function Quotes() {
  const [quoteArr, setQuoteArr] = useState([]);
  const [toggleDelModal, setToggleDelModal] = useState(false);
  const [quoteTarget, setQuoteTarget] = useState();
  const [toggleSnack, setToggleSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState(true);

  //feedback
  const closeDelete = () => setToggleDelModal(false);
  const openDelete = () => setToggleDelModal(true);
  const resetTarget = () => setQuoteTarget("");
  const openSnack = () => setToggleSnack(true);
  const deleteMsg = () => setSnackMsg("Quote Deleted");
  const editMsg = () => setSnackMsg("Quote Updated");

  const getQuotes = async () => {
    const userDoc = await getDoc(doc(db, "QuotesDB", auth.currentUser.uid));
    if (userDoc.data()) {
      setQuoteArr(userDoc.data().quotes);
    }
  };

  useEffect(() => {
    getQuotes();
  }, [quoteArr]);

  return (
    <Container sx={appStyle}>
      <Box sx={mainContainer} id="quoteBoxContainer">
        <Typography variant="h5">Your Quotes</Typography>
        {quoteArr.map((quoteObj, idx) => {
          if (!quoteObj.type) {
            return (
              <QuoteBox
                openDelete={openDelete}
                setTarget={setQuoteTarget}
                id={quoteObj.id}
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
                openDelete={openDelete}
                setTarget={setQuoteTarget}
                id={quoteObj.id}
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
      </Box>
      <Snackbar
        ContentProps={{
          sx: {
            background: "#fff",
            color: "#000",
          },
        }}
        open={toggleSnack}
        autoHideDuration={6000}
        onClose={() => setToggleSnack(false)}
        message={"Quote Deleted"}
      >
        <Alert
          onClose={() => setToggleSnack(false)}
          severity="success"
          variant="filled"
        >
          {snackMsg}
        </Alert>
      </Snackbar>
      <DeleteQModal
        setArr={setQuoteArr}
        snackMsg={deleteMsg}
        openSnack={openSnack}
        resetTarget={resetTarget}
        targetId={quoteTarget}
        close={closeDelete}
        toggle={toggleDelModal}
      />
    </Container>
  );
}

const mainContainer = {
  minHeight: "500px",
  position: "relative",
  borderRadius: "10px",
  minHeight: "93%",
  mb: "40px",
};
