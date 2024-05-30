"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [450, 300, 600, 100, 800, 200, 90],
      backgroundColor: "black",
    },
    {
      label: "Dataset 2",
      data: [450, 300, 600, 100, 800, 200, 90],
      backgroundColor: "gray",
    },
  ],
};

const BarChart = () => {
  return <Bar options={options} data={data} />;
};

export default BarChart;
