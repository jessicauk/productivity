import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Form from "@/components/form";

type FormState = {
  title: string;
  description: string;
  duration: string;
  priority: string;
  selectedTime: Date | null;
};

interface TaskDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function TaskDialog({ open, handleClose }: TaskDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleSubmit = (data: FormState) => {
    console.log(data);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="task-dialog"
      classes={{ paper: "dark:bg-gray-800 dark:text-white text-4xl" }}
    >
      <DialogTitle id="task-dialog">Add New Task</DialogTitle>
      <DialogContent>
        <Form
          handleSubmit={(data: FormState) => handleSubmit(data)}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
