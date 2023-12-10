// Navbar.js
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDeleteAcc = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/users/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Account deleted");

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-gray-800 h-[15vh] flex justify-between items-center w-[100vw]">
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

      <div className="lg:hidden">
        <button
          className="text-white p-2 focus:outline-none"
          onClick={toggleMenu}
        >
          {!menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
        </button>
      </div>

      <div className={`hidden lg:flex mr-4 items-center`}>
        <Link
          className="bg-blue-300 h-8 lg:w-24 mr-4 border-none outline-none rounded-lg text-black font-bold text-sm cursor-pointer transition duration-400 hover:bg-transparent hover:text-yellow-300 hover:border-2 hover:border-yellow-300 text-center"
          to="/stats"
        >
          Your Activity
        </Link>
        <div className="">
          <button
            className="bg-yellow-300 h-8 lg:w-24 mr-4 border-none outline-none rounded-lg text-black font-bold text-sm cursor-pointer transition duration-400 hover:bg-transparent hover:text-yellow-300 hover:border-2 hover:border-yellow-300"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>

        <button
          className="w-32 bg-red-500 h-8 border-none outline-none rounded-lg text-white font-bold text-sm cursor-pointer transition duration-400 hover:bg-transparent hover:text-red-500 hover:border-2 hover:border-red-500"
          onClick={handleDeleteAcc}
        >
          Delete Account
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-16 right-0 bg-gray-800 w-48 text-white py-2">
          <Link
            className="block px-4 py-2 text-sm hover:bg-gray-600"
            to="/stats"
            onClick={toggleMenu}
          >
            Your Activity
          </Link>
          <button
            className="block px-4 py-2 text-sm hover:bg-gray-600"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          <button
            className="block px-4 py-2 text-sm hover:bg-gray-600"
            onClick={handleDeleteAcc}
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
