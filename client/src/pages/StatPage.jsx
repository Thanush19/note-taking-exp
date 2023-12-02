import React, { useEffect } from "react";
import Stats from "../components/Stats";
import NotesGraph from "../components/NotesGraph";
import axios from "axios";
import { useUser } from "../context/UserContext";

const StatPage = () => {
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

  return (
    <>
      <div className="text-yellow-500 bold text-2xl md:text-3xl bg-gray-600">
        {username && (
          <p className="">
            Welcome, <span className="uppercase">{username}</span>!!!
          </p>
        )}
        <h1 className="text-center  text-white">Your personalised dashboard</h1>
        <Stats />
        <NotesGraph />
      </div>
    </>
  );
};

export default StatPage;
