"use client";
import DashboardCard from "@/components/dashboard-card/page";
import DataTable from "@/components/data-table/page";

const Tasks = () => {
  return (
    <main className="w-full h-screen">
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
          backgroundColor="bg-green-300"
        />
      </div>
      <div className="w-full">
        <DataTable />
      </div>
    </main>
  );
};

export default Tasks;
