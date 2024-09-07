"use client";

// components/IncomeChart.tsx
import dynamic from "next/dynamic";
import { useState } from "react";
import { Props as ApexChart } from "react-apexcharts";

// Import dynamically, with no SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const IncomeChart = () => {
  const [chartData] = useState<ApexChart>({
    series: [
      {
        name: "Income",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Outcome",
        data: [36, 38, 18, 21, 12, 19, 90],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      yaxis: {
        title: {
          text: "Value",
        },
      },

      colors: ["#3c6dff", "#FF4560"],
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
        },
      },
    },
  });

  return (
    <div className="my-4">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default IncomeChart;
