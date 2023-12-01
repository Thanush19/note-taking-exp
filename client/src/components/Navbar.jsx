import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    const token = localStorage.getItem("token");

    axios({
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/users/logout`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async () => {
      const isTokenExists = await localStorage.getItem("token");
      if (isTokenExists) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  const handleDeleteAcc = () => {
    const token = localStorage.getItem("token");

    axios({
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/users/delete`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      console.log("User Account deleted");
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  return (
    <div className="bg-gray-800 h-16 flex justify-between items-center">
      <div className="ml-4">
        <Link
          className="text-yellow-300 text-lg font-light cursor-pointer"
          to="/dashboard"
        >
          <h1 className="font-light text-2xl cursor-pointer t-NOTES">
            T-NOTES
          </h1>
        </Link>
      </div>
      <div className="flex mr-4 justify-between items-center">
        <Link
          className="text-white text-lg ml-4 cursor-pointer hover:underline"
          to="/stats"
        >
          Your Activity
        </Link>
      </div>
      <div className="flex">
        <button
          className="bg-yellow-300 h-8 w-24 mr-4 border-none outline-none rounded-lg text-black font-bold text-sm cursor-pointer transition duration-400 hover:bg-transparent hover:text-yellow-300 hover:border-2 hover:border-yellow-300"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        <button
          className="w-32 bg-red-500 h-8 border-none outline-none rounded-lg text-white font-bold text-sm cursor-pointer transition duration-400 hover:bg-transparent hover:text-red-500 hover:border-2 hover:border-red-500"
          onClick={handleDeleteAcc}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Navbar;
