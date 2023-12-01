import React from "react";
import { Bar } from "react-chartjs-2";

const StatsVisualizer = ({ stats }) => {
  const data = {
    labels: ["Total Notes", "Starred Notes", "Tags Used"],
    datasets: [
      {
        label: "Statistics",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: "rgba(255,255,255,0.8)",
        borderWidth: 1,
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBorderColor: "rgba(255,255,255,1)",
        data: [
          stats.totalNotes || 0,
          stats.totalStarredNotes || 0,
          stats.tags ? stats.tags.length : 0,
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-white text-lg font-bold mb-4">
        Statistics Visualization
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatsVisualizer;
