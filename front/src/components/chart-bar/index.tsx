import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

import { MealMetricsData } from "../../pages/metrics/interfaces/meals-metrics.interface";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Dataset",
    },
  },
};

const ChartBar = ({ mealData }: { mealData: MealMetricsData }) => {
  return <Bar options={options} data={mealData} />;
};

export default ChartBar;
