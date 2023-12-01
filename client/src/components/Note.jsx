// Note.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Footer from "./Footer";
import moment from "moment";

const Note = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios({
      method: "GET",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/notes/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setNote(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-600 h-1/2 p-32 flex flex-col justify-center items-center">
        <div className="flex justify-between w-full mb-4">
          <Link to="/dashboard" className="text-white">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </Link>
          <button className="text-white" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Edit
          </button>
        </div>
        <h1 className="text-yellow-300 text-2xl font-light mb-10">
          Note Details
        </h1>

        {note && (
          <div className="text-white border border-white rounded-xl w-[50vw] h-[40vh] flex justify-center bordered-xl items-center flex-col   ">
            <p>{`Content: ${note.content}`}</p>
            <p className="text-gray-400">
              Created {moment(note.createdAt).fromNow()}
            </p>
            <p>
              Star:{" "}
              {note.star ? (
                <FontAwesomeIcon icon={faStarSolid} />
              ) : (
                <FontAwesomeIcon icon={faStarRegular} />
              )}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Note;
