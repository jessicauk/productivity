import { API_CHARTS_DASHBOARD } from "@/const";
import { Task, Counter } from "../interfaces";

export type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: Counter[];
};

async function getCounterDashboard() {
  const response = await fetch(API_CHARTS_DASHBOARD);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result;
}

export { getCounterDashboard };
