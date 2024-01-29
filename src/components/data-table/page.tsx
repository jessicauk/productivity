"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api-client";
import Link from "next/link";
import { StyledDataGrid } from "./styles";
import Timer from "@/components/timer";

const columns: GridColDef[] = [
  {
    field: "taskId",
    headerName: "ID",
    width: 40,
    headerClassName: "text-white font-bold",
    renderCell: (params) => (
      <Link href={`/tasks/${params.row.taskId}`} passHref>
        {params.row.taskId}
      </Link>
    ),
  },
  {
    field: "spentTime",
    headerName: "Timer",
    width: 150,
    headerClassName: "text-white font-bold",
    renderCell: (params) => {
      if (params.row.done) {
        return <div>Completed</div>;
      }
      return <Timer duration={params.row.duration} />;
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
    headerClassName: "text-white font-bold",
    renderCell: (params) => (
      <Link href={`/tasks/${params.row.taskId}`} passHref>
        {params.row.title}
      </Link>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
    headerClassName: "text-white font-semibold",
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    headerClassName: "text-white font-semibold",
    renderCell: (params) => (
      <div className="flex justify-center items-center">
        <div
          className={`w-4 h-4 rounded-full ${
            params.row.status.name === "To Do"
              ? "bg-violet-300"
              : params.row.status.name === "In Progress"
              ? "bg-yellow-300"
              : "bg-sky-300"
          }`}
        />
        <div className="ml-2">{params.row.status.name}</div>
      </div>
    )
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 100,
    headerClassName: "text-white font-semibold",
  },
  {
    field: "timeSpent",
    headerName: "Time Spent",
    width: 100,
    headerClassName: "text-white font-semibold",
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 100,
    headerClassName: "text-white font-semibold",
    renderCell: (params) => (
      <div className="flex justify-center items-center">
        <div
          className={`w-4 h-4 rounded-full ${
            params.row.priority.name === "high"
              ? "bg-red-300"
              : params.row.priority.name === "medium"
              ? "bg-orange-300"
              : "bg-green-300"
          }`}
        />
        <div className="ml-2">{params.row.priority.name}</div>
      </div>
    )
  },
];

interface TasksData {
  taskId: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  status: string;
  duration: number;
  timeSpent: number;
  done: boolean;
}

export default function DataTable() {
  const { data } = useQuery<TasksData[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return (
    <div style={{ height: 400, width: "100%" }} className="dark:text-white">
      <StyledDataGrid
        className="dark:text-white"
        rows={data || []}
        columns={columns}
        getRowId={(row) => row.taskId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        getRowClassName={(params) =>
          `task--${params.row.status.name.replaceAll(" ", "-").toLowerCase()}`
        }
        classes={{
          root: "dark:text-white",
          footerContainer: "dark:text-white",
          toolbarContainer: "dark:text-white font-semibold",
        }}
      />
    </div>
  );
}
