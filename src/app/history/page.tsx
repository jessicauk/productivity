"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useTimeFormatter } from "@/hooks/useTimeFormatter";
import { StyledDataGrid } from "../../components/data-table/styles";
import Loader from "../../components/loader";
import { getHistoryTasks } from "../../api-client/history";
import { TaskResponse } from "../../interfaces";

interface Props {
  getTimeFormat: (time: number) => { time: string };
}

const getColumns = ({ getTimeFormat }: Props) =>
  [
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
      ),
      valueGetter: (params) => params.row.status.name,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
      headerClassName: "text-white font-semibold",
      renderCell: (params) => getTimeFormat(params.value).time,
    },
    {
      field: "timeSpent",
      headerName: "Time Spent",
      width: 100,
      headerClassName: "text-white font-semibold",
      renderCell: (params) => getTimeFormat(params.value).time,
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
      ),
      valueGetter: (params) => params.row.priority.name,
    },
  ] as GridColDef[];

export default function History() {
  const router = useRouter();
  const { getTimeFormat } = useTimeFormatter();

  const { data, isLoading } = useQuery<TaskResponse[]>({
    queryKey: ["history"],
    queryFn: getHistoryTasks,
  });
  const columns = React.useMemo(
    () =>
      getColumns({
        getTimeFormat,
      }),
    []
  );
  return (
    <div className="dark:text-white h-full w-full">
      <h1 className="dark:text-white text-left mb-5 text-2xl">History</h1>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}
