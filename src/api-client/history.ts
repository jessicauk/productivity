import { API_HISTORY } from "@/const";
import { TaskResponse } from "../interfaces";

export type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: TaskResponse[];
};

async function getHistoryTasks() {
  const response = await fetch(API_HISTORY);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result;
}

export { getHistoryTasks };
