import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Pagination,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { appStyle } from "../AppSx";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../credentials";
import QuoteBox from "./components/QuoteBox";
import DeleteQModal from "./modals/DeleteQModal";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function Quotes() {
  const [quoteArr, setQuoteArr] = useState([]);
  const [toggleDelModal, setToggleDelModal] = useState(false);
  const [quoteTarget, setQuoteTarget] = useState("");
  const [toggleSnack, setToggleSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState(true);

  //pagination
  const [buttonsArr, setButtonsArr] = useState([]);
  const [curArr, setCurArr] = useState([]);

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
  }, []);

  useEffect(() => {
    if (quoteArr.length > 0) {
      let amounts = quoteArr.length / 10 + ""; //14 qutoes -> 1.4
      let splits = amounts.split("."); //[1, 4]
      let pageNum = splits[0];
      let remainder = splits[1];
      if (remainder > 0) {
        pageNum = parseInt(pageNum) + 1; //if 14 that means 1 full plus another
      }

      let pageButtons = [];

      for (let i = 0; i < pageNum; i++) {
        pageButtons.push(i);
      }

      setButtonsArr(pageButtons);
      changePage(0);
    }
  }, [quoteArr]);

  const changePage = (pageNum) => {
    let newArr = [];
    let endNum = pageNum;
    let startNum = pageNum;

    startNum = startNum + "" + 0;
    startNum = parseInt(startNum);
    endNum = startNum + 10;

    quoteArr.forEach((quoteObj, idx) => {
      if (idx >= startNum && idx < endNum) {
        newArr.push(quoteObj);
      }
    });

    setCurArr(newArr);
  };

  return (
    <Container sx={appStyle}>
      <Box sx={mainContainer} id="quoteBoxContainer">
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <BookmarkIcon sx={{ mr: "3px" }} />
          Your Quotes
        </Typography>
        <Stack spacing={2} sx={{ mt: "15px" }}>
          <Pagination
            count={buttonsArr.length}
            onChange={(event, value) => {
              value -= 1;
              changePage(value);
            }}
          />
        </Stack>
        {curArr.map((quoteObj, idx) => {
          if (!quoteObj.type) {
            return (
              <QuoteBox
                openDelete={openDelete}
                setTarget={setQuoteTarget}
                id={quoteObj.id}
                bookId={quoteObj.book}
                quote={quoteObj.quote}
                page={quoteObj.page}
                key={quoteObj.id}
                setArr={setQuoteArr}
                snackMsg={editMsg}
                openSnack={openSnack}
                resetTarget={resetTarget}
                targetId={quoteTarget}
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
                setArr={setQuoteArr}
                snackMsg={editMsg}
                openSnack={openSnack}
                resetTarget={resetTarget}
                targetId={quoteTarget}
              />
            );
          }
        })}
        <Stack spacing={2} sx={{ mt: "15px" }}>
          <Pagination
            count={buttonsArr.length}
            onChange={(event, value) => {
              value -= 1;
              changePage(value);
            }}
          />
        </Stack>
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
  bgcolor: "#fff",
  padding: "10px",
};
