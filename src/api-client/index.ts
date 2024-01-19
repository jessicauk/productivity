import { GET_TASKS } from "@/const";

async function getTasks() {
  const response = await fetch(GET_TASKS);
  const result = await response.json();
  return result;
}

export { getTasks };
