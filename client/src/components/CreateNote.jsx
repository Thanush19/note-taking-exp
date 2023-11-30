import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CreateNote = () => {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [star, setStar] = useState(false); // Assuming star is initially not selected
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    const note = {
      content,
      tag: tag.split(",").map((t) => t.trim()), // Split tags by commas and trim whitespace
      star,
    };

    axios({
      method: "POST",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: note,
    })
      .then(() => {
        console.log("New Note Added");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error creating note:", error);
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
          <div className="flex flex-col mb-8">
            <label htmlFor="tag" className="text-white">
              Tags (comma-separated):
            </label>
            <input
              type="text"
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-96 bg-gray-600 outline-none text-white border-2 border-yellow-300 rounded-lg p-2"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="star" className="text-white mr-2">
              Star:
            </label>
            <span
              className={`cursor-pointer text-white ${
                star ? "text-yellow-300" : ""
              }`}
              onClick={() => setStar(!star)}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-32 bg-yellow-300 h-10 border-none outline-none rounded-lg text-white font-bold text-base cursor-pointer transition duration-400 hover:bg-transparent hover:text-yellow-300 hover:border-2 hover:border-yellow-300"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
