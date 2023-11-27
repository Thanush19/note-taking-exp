import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateNote = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = { content };

    axios({
      method: "POST",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: note,
    }).then(() => {
      console.log("New Note Added");
      navigate("/dashboard");
    });
  };

  return (
    <div className="bg-gray-600 h-1/2 p-32 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center">
            <h3 className="text-yellow-300 text-2xl font-light mb-10">Note</h3>
            <textarea
              className="w-96 h-32 bg-gray-600 outline-none text-white border-2 border-yellow-300 rounded-lg mb-16 p-2"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-32 bg-yellow-300 h-10 border-none outline-none rounded-lg text-white font-bold text-base cursor-pointer transition duration-400 hover:bg-transparent hover:text-yellow-300 hover:border-2 hover:border-yellow-300"
            onClick={handleSubmit}
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
