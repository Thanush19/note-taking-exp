import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const EditTask = ({ noteId }) => {
  const [content, setContent] = useState("");
  const [star, setStar] = useState(false);
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (noteId) {
      axios({
        method: "GET",
        url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes/${noteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const { content, star, tag } = response.data; // Update property name to match backend
          setContent(content);
          setStar(star);
          setTags(tag ? tag.join(", ") : "");
        })
        .catch((error) => {
          console.error("Error fetching note:", error);
        });
    }
  }, [noteId, token]);

  const handleUpdateNote = (e) => {
    e.preventDefault();

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const updatedNote = {
      content,
      star,
      tag: tagsArray, // Update property name to match backend
    };

    axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/edit/${noteId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: updatedNote,
    })
      .then(() => {
        console.log("Note Updated");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  return (
    <div className="bg-gray-600 h-1/2 p-32 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleUpdateNote}>
          <div className="flex flex-col justify-center">
            <h3 className="text-yellow-300 text-2xl font-light mb-10">
              Edit Note
            </h3>
            <textarea
              className="w-96 h-32 bg-gray-600 outline-none text-white border-2 border-yellow-300 rounded-lg mb-16 p-2"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-4">
            <span
              onClick={() => setStar(!star)}
              className={`cursor-pointer text-white mr-2 ${
                star ? "text-yellow-300" : ""
              }`}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
            <label htmlFor="star" className="text-white">
              Star
            </label>
          </div>

          <div className="flex flex-col mb-8">
            <label htmlFor="tags" className="text-white">
              Tags (comma-separated):
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-96 bg-gray-600 outline-none text-white border-2 border-yellow-300 rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-32 bg-yellow-300 h-10 border-none outline-none rounded-lg text-white font-bold text-base cursor-pointer transition duration-400 hover:bg-transparent hover:text-yellow-300 hover:border-2 hover:border-yellow-300"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
