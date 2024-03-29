import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Form from "@/components/form";
import { ApiResponse, postTask } from "@/api-client";
import { timeToSeconds, minutesToSeconds } from "@/utils/timeToSeconds";
import { Task, TaskForm } from "../../interfaces";

interface TaskDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function TaskDialog({ open, handleClose }: TaskDialogProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse, Error, Task>({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["counter"] });
      handleClose();
    },
  });
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = (data: TaskForm) => {
    const priorityId = parseInt(data.priorityId);

    const duration =
      data?.duration === "custom"
        ? timeToSeconds(
            dayjs(data?.durationCustom?.toString()).format("HH:mm:ss")
          )
        : minutesToSeconds(parseInt(data?.duration ?? "0"));

    const newTask = {
      title: data.title,
      description: data.description,
      priorityId,
      duration,
    };

    mutation.mutate(newTask);
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
          loading={mutation.isPending}
          handleSubmit={(data: TaskForm) => handleSubmit(data)}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
