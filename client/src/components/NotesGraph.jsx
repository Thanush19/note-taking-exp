// NotesGraph.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const NotesGraph = () => {
  const [notesData, setNotesData] = useState({ total: 0, starred: 0 });

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
        const notesCount = countNotes(notes);

        setNotesData(notesCount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const countNotes = (notes) => {
    const notesCount = {
      total: notes.length,
      starred: notes.filter((note) => note.star).length,
    };

    return notesCount;
  };

  const data = {
    labels: ["Total Notes", "Starred Notes"],
    datasets: [
      {
        data: [notesData.total, notesData.starred],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  return (
    <div className="bg-gray-600 h-1/2 p-32 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-yellow-300 text-2xl font-light mb-10">
          Notes Overview
        </h1>

        {notesData.total === 0 ? <p>No notes found.</p> : <Bar data={data} />}
      </div>
    </div>
  );
};

export default NotesGraph;
