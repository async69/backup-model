import React from "react";
import { Doughnut } from "@reactchartjs/react-chart.js";

const data = {
  labels: ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
  datasets: [
    {
      //   label: "# of Votes",
      data: [20, 30, 10, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

const DoughnutChart = () => (
  <>
    <Doughnut width="20%" height="25%" data={data} />
  </>
);

export default DoughnutChart;
