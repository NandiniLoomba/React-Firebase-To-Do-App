import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { doc, updateDoc } from "firebase/firestore";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import db from "./firebaseConfig";

function Update(props) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(props.work);

  const handleUpdate = () => {
    const dbRef = doc(db, "todos", props.id);

    updateDoc(dbRef, {
      task: val,
    });
    setOpen(false);
  };

  return (
    <div>
      <BorderColorIcon onClick={() => {setOpen(true); }} ></BorderColorIcon>
      
      <Dialog open={open} onClose={() => { setOpen(false);}}>

          <DialogTitle>Update the task..</DialogTitle>
          <DialogContent> <TextField autoFocus margin="dense" fullWidth value={val} onChange={(event) => { setVal(event.target.value); }} variant="standard"/></DialogContent>
          
          <DialogActions>
              <Button onClick={() => { setOpen(false); }} > Cancel </Button>
              <Button onClick={handleUpdate}>Update</Button> 
          </DialogActions>

      </Dialog>
    </div>
  );
}

export default Update;
