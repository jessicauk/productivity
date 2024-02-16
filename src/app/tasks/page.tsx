"use client";
import DashboardCard from "@/components/dashboard-card/page";
import DataTable from "@/components/data-table/page";
import DialogContainer from "@/components/dialog-container";
import { useQuery } from "@tanstack/react-query";
import { getCounterDashboard } from "@/api-client/charts";
import { Counter } from "@/interfaces";

const Tasks = () => {
  const { data } = useQuery<Counter[]>({
    queryKey: ["counter"],
    queryFn: () => getCounterDashboard(),
  })

  return (
    <div className="w-full">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 grid-flow-row">
        <DashboardCard
          title="To do"
          count={data?.find(item => item.statusId === 1)?._count ?? 0}
          backgroundColor="bg-violet-300"
        />
        <DashboardCard
          title="In Progress"
          count={data?.find(item => item.statusId === 2)?._count ?? 0}
          backgroundColor="bg-yellow-300"
        />
        <DashboardCard
          title="Completed"
          count={data?.find(item => item.statusId === 3)?._count ?? 0}
          backgroundColor="bg-sky-300"
        />
      </div>
      <div className="w-full">
        <DialogContainer />
        <DataTable />
      </div>
    </div>
  );
};

export default Tasks;
