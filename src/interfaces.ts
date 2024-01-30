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
  taskId?: number;
  done?: boolean;
  statusId?: number;
  timeSpent?: number;
}

export interface TaskResponse extends Task {
  createdAt: string;
  updatedAt: string;
  done: boolean;
  status: { idStatus: number; name: string };
  statusId: number;
  timeSpent: number;
  authorId: number;
  priority: { idPriority: number; name: string };
  priorityId: number;
}

export interface Counter {
  _count: number;
  statusId: number;
}
