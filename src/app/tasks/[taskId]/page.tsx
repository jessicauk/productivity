"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getTaskById, updateTask } from "@/api-client";
import Form from "@/components/form";
import { TaskForm, TaskResponse, Task } from "@/interfaces";
import { ApiResponse } from "@/api-client";
import Loader from "@/components/loader";
import { timeToSeconds, minutesToSeconds } from "@/utils/timeToSeconds";

interface TaskPageProps {
  params: {
    taskId: string;
  };
}

export default function TaskPage({ params }: TaskPageProps) {
  const router = useRouter();

  const { data, isLoading } = useQuery<TaskResponse>({
    queryKey: ["task", params.taskId],
    queryFn: () => getTaskById(params.taskId),
  });

  const mutation = useMutation<ApiResponse, Error, Task>({
    mutationFn: (data) => updateTask({ data, taskId: params.taskId }),
    onSuccess: () => {
      router.push("/tasks");
    },
  });

  const handleSubmit = (data: TaskForm) => {
    const { durationCustom, ...rest } = data || {};
    const newData = {
      ...rest,
      duration:
      data?.duration === "custom"
        ? timeToSeconds(dayjs(data?.durationCustom?.toString()).format("HH:mm:ss"))
        : minutesToSeconds(parseInt(data?.duration ?? "0")),
      priorityId: parseInt(data.priorityId), // Convert priorityId to number
    } as Task;

    mutation.mutate(newData);
  };

  const handleClose = () => {
    router.push("/tasks");
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="dark:text-white font-bold">Task #{params.taskId}</h1>
          <Form
            data={data}
            handleSubmit={(dataForm) => handleSubmit(dataForm)}
            handleClose={handleClose}
          />
        </>
      )}
    </div>
  );
}
