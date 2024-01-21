"use client";
import DashboardCard from "@/components/dashboard-card/page";
import DataTable from "@/components/data-table/page";
import DialogContainer from "@/components/dialog-container";

const Tasks = () => {
  return (
    <div className="w-full">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 grid-flow-row">
        <DashboardCard
          title="To do"
          count={0}
          backgroundColor="bg-violet-300"
        />
        <DashboardCard
          title="In Progress"
          count={0}
          backgroundColor="bg-yellow-300"
        />
        <DashboardCard
          title="Completed"
          count={0}
          backgroundColor="bg-sky-300"
        />
      </div>
      <div className="w-full h-full">
        <DialogContainer />
        <DataTable />
      </div>
    </div>
  );
};

export default Tasks;
