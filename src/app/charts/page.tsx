"use client";

import React, { useMemo } from "react";
import { DefaultizedPieValueType } from "@mui/x-charts";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useQuery } from "@tanstack/react-query";
import { getProductivityChart } from "../../api-client/charts";
import { Productivity } from "../../interfaces";

const sizing = {
  width: 400,
  height: 400,
  legend: { hidden: true },
};
export default function Charts() {
  const { data } = useQuery<Productivity[]>({
    queryKey: ["charts/pie"],
    queryFn: () => getProductivityChart(),
  });

  const pieData = useMemo(() => {
    const format = (dataSeries: Productivity[] | []) => {
      return dataSeries?.map((item: Productivity) => {
        return {
          label: item.statusId === 3 ? "Completed" : "In Progress",
          value: item._sum?.timeSpent ?? 0,
        };
      });
    };
    return format(data ?? []);
  }, [data]);

  const TOTAL = pieData?.map((item) => item.value).reduce((a, b) => a + b, 0) ?? 0;

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="dark:text-white h-full w-full">
      <h1 className="dark:text-white text-left mb-5 text-2xl">Charts</h1>
      <PieChart
        series={[
          {
            data: pieData ?? [],
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        {...sizing}
      />
    </div>
  );
}
