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

interface Status {
  idStatus: number;
  name: string;
}

interface Priority {
  idPriority: number;
  name: string;
}

export interface TaskResponse extends Task {
  createdAt: string;
  updatedAt: string;
  status: Status;
  authorId: number;
  priority: Priority;
}

export interface Counter {
  _count: number;
  statusId: number;
}

export interface Productivity {
  _sum: { timeSpent: number };
  statusId: number;
  value: number;
  id: number;
}
