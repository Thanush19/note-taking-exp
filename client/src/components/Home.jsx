// Home.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { username, setUsername } = useUser();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsername(response.data.name || response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [setUsername]);
  const [notes, setNotes] = useState([]);
  const [starredNotes, setStarredNotes] = useState([]);
  const navigate = useNavigate();
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios({
      method: "GET",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const allNotes = res.data;
        console.log(allNotes);

        setNotes(allNotes);
        setStarredNotes(allNotes.filter((note) => note.star)); // Update this line
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
        axios({
          method: "GET",
          url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            const allNotes = res.data;
            setNotes(allNotes);
            setStarredNotes(allNotes.filter((note) => note.star === true));
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
          url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes`,
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

  // Separate starred and other notes
  const starredNotesElements = starredNotes.map((note) => (
    <li
      key={note._id}
      className="text-white mb-4 border border-white rounded-md w-[60vw] flex justify-center items-center p-4"
    >
      <div className="">
        <div className="text-gray-400">
          Created {moment(note.createdAt).fromNow()}
        </div>
        <Link to={`/note/${note._id}`}>{note.content}</Link>
      </div>

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
  ));

  const otherNotesElements = notes
    .filter((note) => !note.star)
    .map((note) => (
      <li
        key={note._id}
        className="text-white mb-4 border border-white rounded-md w-[60vw] flex justify-center items-center p-4"
      >
        <div className="">
          <div className="text-gray-400">
            Created {moment(note.createdAt).fromNow()}
          </div>
          <Link to={`/note/${note._id}`}>{note.content}</Link>
        </div>

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
    ));

  return (
    <div className="bg-gray-600 h-1/2 p-32 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="text-yellow-500 bold text-2xl md:text-3xl">
          {username && (
            <p className="">
              Welcome, <span className="uppercase">{username}</span>!!!
            </p>
          )}
        </div>

        <h1 className="text-yellow-300 text-2xl font-light mb-10">All Notes</h1>
        <h1 className="text-yellow-300 text-2xl font-light mb-10">
          All Notes ({notes.length} notes, {starredNotes.length} starred)
        </h1>
        <button
          className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg text-white mb-4"
          onClick={() => navigate("/create")}
        >
          Add New Note
        </button>
        {!notes || (notes.length === 0 && <p>No notes found.</p>)}
        {notes && (
          <ul>
            {starredNotesElements}

            {otherNotesElements}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
