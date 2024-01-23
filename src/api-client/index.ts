import { API_TASKS } from "@/const";
import { Task, TaskResponse } from "../interfaces";

async function getTasks() {
  const response = await fetch(API_TASKS);
  const result = await response.json();
  return result;
}
export type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: TaskResponse;
};

async function postTask(task: Task): Promise<ApiResponse> {
  const response = await fetch(API_TASKS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const result = response.json();
  return result;
}

export { getTasks, postTask };
