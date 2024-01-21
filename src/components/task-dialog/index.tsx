import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Form from "@/components/form";

interface TaskDialogProps {
  open: boolean;
  handleClose: () => void;
}
export default function TaskDialog({ open, handleClose }: TaskDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="task-dialog"
    >
      <DialogTitle id="task-dialog">Add New Task</DialogTitle>
      <DialogContent>
        <Form />
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleClose} autoFocus>
          Create || Update
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}
