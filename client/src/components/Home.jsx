import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios({
      method: "GET",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/all-notes`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDeleteNote = (id) => {
    const token = localStorage.getItem("token");

    axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("Note deleted");
        // Reload the notes after deletion
        axios({
          method: "GET",
          url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/all-notes`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            setNotes(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  const handleToggleStar = (id) => {
    const token = localStorage.getItem("token");

    axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/toggle-star/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("Star toggled");
        axios({
          method: "GET",
          url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/all-notes`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            setNotes(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((error) => {
        console.error("Error toggling star:", error);
      });
  };

  return (
    <div className="bg-gray-600 h-1/2 p-32 flex flex-col justify-center items-center">
      <h1 className="text-yellow-300 text-2xl font-light mb-10">All Notes</h1>

      {!notes || (notes.length === 0 && <p>No notes found.</p>)}
      {notes && (
        <ul>
          {notes.map((note) => (
            <li key={note._id} className="text-white mb-4">
              {note.content}
              <span className="ml-4 cursor-pointer">
                <Link to={`/edit/${note._id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </span>
              <span
                className="ml-4 cursor-pointer"
                onClick={() => handleDeleteNote(note._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span
                className="ml-4 cursor-pointer"
                onClick={() => handleToggleStar(note._id)}
              >
                {note.star ? (
                  <FontAwesomeIcon icon={faStarSolid} />
                ) : (
                  <FontAwesomeIcon icon={faStarRegular} />
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
