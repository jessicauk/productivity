"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api-client";
import Form from "@/components/form";
import { TaskForm, TaskResponse } from "@/interfaces";

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
  const handleClose = () => {
    router.push("/tasks");
  };

  return (
    <div>
      <h1 className="dark:text-white font-bold">Task #{params.taskId}</h1>
      <Form
        data={data}
        handleSubmit={(data: TaskForm) => console.log(data)}
        handleClose={handleClose}
      />
    </div>
  );
}
