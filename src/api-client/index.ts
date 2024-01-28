import { API_TASKS } from "@/const";
import { Task, TaskResponse } from "../interfaces";

export type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: TaskResponse;
};

async function getTasks() {
  const response = await fetch(API_TASKS);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result;
}

async function postTask(task: Task): Promise<ApiResponse> {
  const response = await fetch(API_TASKS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = response.json();
  return result;
}

async function getTaskById(id: string): Promise<TaskResponse> {
  const response = await fetch(`${API_TASKS}/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result.data;
}

async function updateTask({
  data,
  taskId,
}: {
  data: Task;
  taskId: string;
}): Promise<ApiResponse> {
  const response = await fetch(`${API_TASKS}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = response.json();
  return result;
}

export { getTasks, postTask, getTaskById, updateTask };
