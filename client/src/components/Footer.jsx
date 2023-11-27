import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 h-20 flex justify-between items-center w-screen">
      <h2 className="text-yellow-300 ml-4 font-light cursor-default">
        T-NOTES
      </h2>
      <div className="flex mr-4">
        <span className="ml-4 text-white text-sm cursor-pointer hover:underline">
          About
        </span>
        <span className="ml-4 text-white text-sm cursor-pointer hover:underline">
          Contact
        </span>
        <span className="ml-4 text-white text-sm cursor-pointer hover:underline">
          Support
        </span>
        <span className="ml-4 text-white text-sm cursor-pointer hover:underline">
          Terms
        </span>
        <span className="ml-4 text-white text-sm cursor-pointer hover:underline">
          Privacy
        </span>
      </div>
    </div>
  );
};

export default Footer;
