"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTaskById, updateTask, deleteTask } from "@/api-client";
import Form from "@/components/form";
import { TaskForm, TaskResponse, Task } from "@/interfaces";
import { ApiResponse } from "@/api-client";
import Loader from "@/components/loader";
import AlertDialogSlide from "@/components/alert-dialog";
import { timeToSeconds, minutesToSeconds } from "@/utils/timeToSeconds";

interface TaskPageProps {
  params: {
    taskId: string;
  };
}

export default function TaskPage({ params }: TaskPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery<TaskResponse>({
    queryKey: ["task", params.taskId],
    queryFn: () => getTaskById(params.taskId),
  });

  const mutation = useMutation<ApiResponse, Error, Task>({
    mutationFn: (data) => updateTask({ data, taskId: params.taskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      router.push("/tasks");
    },
  });

  const mutationDelete = useMutation<ApiResponse, Error, string>({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/tasks");
    },
  });

  const handleSubmit = (data: TaskForm) => {
    const { durationCustom, ...rest } = data || {};
    const newData = {
      ...rest,
      duration:
        data?.duration === "custom"
          ? timeToSeconds(
              dayjs(data?.durationCustom?.toString()).format("HH:mm:ss")
            )
          : minutesToSeconds(parseInt(data?.duration ?? "0")),
      priorityId: parseInt(data.priorityId), // Convert priorityId to number
    } as Task;

    mutation.mutate(newData);
  };

  const handleClose = () => {
    router.push("/tasks");
  };

  const handleDelete = () => {
    mutationDelete.mutate(params.taskId);
    setOpen(false);
  };

  const handleToggleDialog = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="dark:text-white font-bold">Task #{params.taskId}</h1>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleToggleDialog}
            >
              <DeleteIcon className="text-teal-300" />
            </IconButton>
            <AlertDialogSlide
              open={open}
              handleClose={handleToggleDialog}
              handleDelete={handleDelete}
            />
          </div>
          <Form
            loading={mutation.isPending}
            data={data}
            handleSubmit={(dataForm) => handleSubmit(dataForm)}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}
