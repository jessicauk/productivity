"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, updateTask, ApiResponse } from "@/api-client";
import { useTimeFormatter } from "@/hooks/useTimeFormatter";
import Link from "next/link";
import { StyledDataGrid } from "./styles";
import Timer from "@/components/timer";
import { Task } from "@/interfaces";

interface Props {
  onUpdate: (data: Partial<Task>) => void;
  getTimeFormat: (time: number) => { time: string };
}

const filterDurationShort = (value: number) => {
  return value <= 1800;
};
const filterDurationMedium = (value: number) => {
  return value > 1800 && value <= 3600;
};
const filterDurationLarge = (value: number) => {
  return value > 3600;
};

const setStatus = (data: Partial<Task>) => {
  if (data.done) {
    return 3;
  }
  if (data?.timeSpent ?? 0 !== 0) {
    return 2;
  }
};

const getColumns = ({ onUpdate, getTimeFormat }: Props) =>
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
      field: "duration",
      headerName: "Timer",
      width: 180,
      headerClassName: "text-white font-bold",
      valueGetter: (params) => params.row.duration,
      renderCell: (params) => {
        if (params.row.done) {
          return <div>Completed</div>;
        }
        return (
          <Timer
            updateTime={(data) =>
              onUpdate({
                ...data,
                statusId: setStatus(data), // data.done ? 3 : params.row.statusId,
                taskId: params.row.taskId,
              })
            }
            duration={params.row.duration}
          />
        );
      },
      filterOperators: [
        {
          label: "Shorter than 30 mins",
          value: "shorter",
          getApplyFilterFn: () => {
            return (params): boolean => {
              return (
                !params.row.done && filterDurationShort(params.value as number)
              );
            };
          },
        },
        {
          label: "From 30 mins to 1 hour",
          value: "medium",
          getApplyFilterFn: () => {
            return (params): boolean => {
              return (
                !params.row.done && filterDurationMedium(params.value as number)
              );
            };
          },
        },
        {
          label: "Greater than 1 hour",
          value: "large",
          getApplyFilterFn: () => {
            return (params): boolean => {
              return (
                !params.row.done && filterDurationLarge(params.value as number)
              );
            };
          },
        },
        {
          label: "Completed",
          value: "completed",
          getApplyFilterFn: () => {
            return (params): boolean => {
              return params.row.done;
            };
          },
        },
      ],
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
    /* {
      field: "duration",
      headerName: "Duration",
      width: 100,
      headerClassName: "text-white font-semibold",
      renderCell: (params) => getTimeFormat(params.value).time,
    }, */
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
  const queryClient = useQueryClient();
  const { getTimeFormat } = useTimeFormatter();

  const { data } = useQuery<TasksData[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const mutation = useMutation<ApiResponse, Error, Partial<Task>>({
    mutationFn: (data: Partial<Task>) =>
      updateTask({ data, taskId: data.taskId?.toString() ?? "" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["counter"] });
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  const columns = React.useMemo(
    () =>
      getColumns({
        onUpdate: (data: Partial<Task>) => {
          mutation.mutate(data);
        },
        getTimeFormat,
      }),
    [mutation]
  );

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
