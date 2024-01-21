"use client";
import * as React from "react";
import TaskDialog from "@/components/task-dialog";

export default function DialogContainer() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-end my-4">
      <button
        onClick={handleClickOpen}
        className="dark:text-white w-1/2 sm:w-40 bg-teal-500 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Add Task
      </button>
      <TaskDialog open={open} handleClose={handleClose} />
    </div>
  );
}
