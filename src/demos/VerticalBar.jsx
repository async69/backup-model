import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";

const data = {
  labels: ["Plumby Nut", "Plumby Sup", "Dimbich", "Tafo Iodized Salt"],
  datasets: [
    {
      label: "in pernectage ",
      data: [32, 66, 100, 83],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 3,
    },
  ],
};

const options = {
  barPercentage: "50",
  scales: {
    yAxes: [
      {
        suffix: "%",
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => (
  <>
    <Bar data={data} options={options} />
  </>
);

export default VerticalBar;
