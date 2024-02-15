import { API_CHARTS_DASHBOARD, API_CHARTS_PRODUCTIVITY } from "@/const";
import { Counter, Productivity } from "../interfaces";

export type ApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: Counter[];
};

export type ApiProductivity = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: Productivity[];
};

async function getCounterDashboard() {
  const response = await fetch(API_CHARTS_DASHBOARD);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result;
}

async function getProductivityChart() {
  const response = await fetch(API_CHARTS_PRODUCTIVITY);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result;
}

export { getCounterDashboard, getProductivityChart };
