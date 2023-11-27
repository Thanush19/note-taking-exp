import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [noteList, setNotes] = useState([]);

  const callFn = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    callFn();
  }, []);

  useEffect(() => {
    callFn();
  }, [setNotes]);

  return (
    <div className="Home bg-gray-600 min-h-screen text-yellow-300 p-32 pb-40">
      <h1 className="HomeNotes text-5xl font-bold underline">Notes</h1>

      <Link to="/create">
        <button className="span>Write a Note</span> AddBtn">+</button>
      </Link>

      {!noteList ||
        (noteList.length === 0 && (
          <h2 className="NoNotesFound">No Notes Found</h2>
        ))}
      <div className="NoteList pt-8">
        {noteList && (
          <div>
            {noteList.map((note) => (
              <div
                key={note._id}
                className="Note p-7 pl-10 text-lg rounded-lg flex justify-between"
              >
                <div className="NoteContent">{note.content}</div>
                <Link to={`/deletetask/${note._id}`}>
                  <span className="DelIcon text-gray-700 hover:text-yellow-300">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
