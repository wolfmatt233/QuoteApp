import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import { signupContainer, signupBtn, modalStyle } from "../../AppSx";
import { auth, db } from "../../credentials";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function DeleteQModal(props) {
  const deleteQuote = async () => {
    const ref = doc(db, "QuotesDB", auth.currentUser.uid);
    let userDoc = await getDoc(ref);
    userDoc = userDoc.data();

    let newQuotes = userDoc.quotes.filter(
      (quote) => quote.id != props.targetId
    );

    await updateDoc(ref, {
      quotes: newQuotes,
    }).then(() => {
      props.close();
      props.openSnack();
      props.snackMsg();
      props.setArr(newQuotes);
    });
  };

  return (
    <Modal
      open={props.toggle}
      onClose={() => {
        props.close();
        props.resetTarget();
      }}
    >
      <Box sx={modalStyle}>
        <Box sx={signupContainer}>
          <Typography variant="h5" sx={{ mb: "20px" }}>
            Delete Quote?
          </Typography>
          <Button
            sx={signupBtn}
            color="error"
            variant="contained"
            onClick={deleteQuote}
          >
            Delete
          </Button>
          <Button
            sx={signupBtn}
            color="primary"
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
