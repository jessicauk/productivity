import { Dayjs } from "dayjs";

export interface TaskForm {
  title: string;
  description?: string;
  duration: string;
  priorityId: string;
  durationCustom?: Dayjs | null;
}
export interface Task {
  title: string;
  description?: string;
  duration: number;
  priorityId: number;
}

export interface TaskResponse extends Task {
  taskId: number;
  createdAt: string;
  updatedAt: string;
  done: boolean;
  status: string;
  timeSpent: number;
  authorId: number;
}
