import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    const user = { username, password };

    axios({
      method: "POST",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    })
      .then((res) => {
        console.log("User logged in");
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert("Authentication failed");
        setUsername("");
        setPassword("");
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const user = { username, password };
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_APP_NOTERAPP_BACKEND}/users/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    })
      .then((res) => {
        console.log("New User created");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <div className="bg-gray-600 text-yellow-300 h-screen w-screen">
      <h1 className=" mb-5 text-3xl font-light">T-Notes</h1>
      <div className="flex flex-col items-center mt-5">
        <form>
          <div className="flex flex-col items-center pb-10">
            <span className="text-lg mb-3 font-light cursor-default">
              Username
            </span>
            <input
              type="text"
              className="h-10 w-72 text-center border-2 border-yellow-300 rounded-lg bg-gray-600 outline-none text-white text-sm"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center pb-16">
            <span className="text-lg mb-3 font-bold cursor-default">
              Password
            </span>
            <input
              type="password"
              className="h-10 w-72 text-center border-2 border-yellow-300 rounded-lg bg-gray-600 outline-none text-white text-sm"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-3 items-center">
            <button
              className="w-72 h-10 mb-5 text-lg font-bold bg-yellow-300 border-2 border-black outline-none cursor-pointer rounded-lg transition duration-400 hover:bg-transparent text-blue-600 hover:border-yellow-300 hover:text-yellow-300"
              onClick={handleSignin}
            >
              Sign In
            </button>
            <button
              className="w-72 h-10 text-lg font-bold bg-teal-500 border-2 border-black outline-none cursor-pointer rounded-lg transition duration-400 hover:bg-transparent hover:border-teal-500 hover:text-teal-500"
              onClick={handleRegister}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
