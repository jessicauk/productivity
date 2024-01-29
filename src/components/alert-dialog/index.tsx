import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  handleClose: () => void;
  handleDelete: () => void;
  open: boolean;
}

export default function AlertDialogSlide({
  handleClose,
  handleDelete,
  open,
}: AlertDialogSlideProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      classes={{ paper: "dark:bg-gray-800 dark:text-white text-4xl" }}
    >
      <DialogTitle>{"Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          className="dark:text-white"
        >
          Are you sure you want to delete this task item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="text"
          className="text-white hover:text-teal-600"
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          className="bg-teal-300 text-white hover:bg-teal-600"
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
}
