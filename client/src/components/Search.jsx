import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-gray-600 text-white rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
