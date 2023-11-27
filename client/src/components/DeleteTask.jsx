import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const DeleteTask = () => {
  const [noteE, setNote] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios({
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setNote(res.data.content);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [id, token]);

  const handleYesDelete = () => {
    axios({
      url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      navigate("/dashboard");
    });
  };

  const handleNoDelete = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-600 h-3/5 p-12 flex flex-col items-center">
      <h2 className="text-yellow-300 text-2xl font-light mb-10">
        Are you sure you want to delete this note?
      </h2>
      <div className="text-yellow-300 text-4xl font-light mb-10">{noteE}</div>
      <div className="flex justify-between w-80">
        <button
          onClick={handleNoDelete}
          className="bg-yellow-300 w-32 h-12 border-none outline-none text-black font-bold text-lg rounded-lg cursor-pointer transition duration-400 hover:bg-transparent hover:text-yellow-300 hover:border-2 hover:border-yellow-300"
        >
          No
        </button>
        <button
          onClick={handleYesDelete}
          className="bg-red-500 w-32 h-12 border-none outline-none text-white font-bold text-lg rounded-lg cursor-pointer transition duration-400 hover:bg-transparent hover:text-red-500 hover:border-2 hover:border-red-500"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteTask;
