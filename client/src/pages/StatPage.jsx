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
      <div>{username && <p>Welcome, {username}</p>}</div>
      <Stats />
      <NotesGraph />
    </>
  );
};

export default StatPage;
