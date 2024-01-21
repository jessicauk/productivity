"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api-client";
import { StyledDataGrid } from "./styles";

const columns: GridColDef[] = [
  {
    field: "taskId",
    headerName: "ID",
    width: 70,
    headerClassName: "text-white font-bold",
  },
  {
    field: "title",
    headerName: "Title",
    width: 300,
    headerClassName: "text-white font-bold",
  },
  {
    field: "description",
    headerName: "Description",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 350,
    headerClassName: "text-white font-semibold",
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    headerClassName: "text-white font-semibold",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 300,
    headerClassName: "text-white font-semibold",
  },
  {
    field: "done",
    headerName: "Is done",
    width: 130,
    headerClassName: "text-white font-semibold",
  },
];

interface TasksData {
  taskId: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  status: string;
  done: boolean;
}

export default function DataTable() {
  const { data, isLoading } = useQuery<TasksData[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return (
    <div style={{ height: 400, width: "100%" }} className="text-white">
      <StyledDataGrid
        rows={data || []}
        columns={columns}
        getRowId={(row) => row.taskId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        getRowClassName={(params) => `task--${params.row.status}`}
      />
    </div>
  );
}