import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Stats = () => {
  const [tagsData, setTagsData] = useState([]);
  let chartInstance = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const notes = response.data;
        console.log(notes);
        const tagsCount = countTags(notes);

        setTagsData(tagsCount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the previous chart instance
    }

    const ctx = document.getElementById("chart");

    chartInstance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(tagsData),
        datasets: [
          {
            data: Object.values(tagsData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
          },
        ],
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Cleanup: destroy the chart instance when the component is unmounted
      }
    };
  }, [tagsData]);

  const countTags = (notes) => {
    const tagsCount = {};

    notes.forEach((note) => {
      if (note.tag && note.tag.length > 0) {
        note.tag.forEach((tag) => {
          tagsCount[tag] = (tagsCount[tag] || 0) + 1;
        });
      }
    });

    return tagsCount;
  };

  return (
    <div className="bg-gray-600 h-1/2 p-32 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-yellow-300 text-2xl font-light mb-10">
          Tag Distribution
        </h1>

        {Object.keys(tagsData).length === 0 ? (
          <p>No tags found.</p>
        ) : (
          <canvas id="chart" width="400" height="400"></canvas>
        )}
      </div>
    </div>
  );
};

export default Stats;
