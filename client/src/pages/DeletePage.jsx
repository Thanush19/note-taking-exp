import React from "react";
import Navbar from "../components/Navbar";
import DeleteTask from "../components/DeleteTask";
import Footer from "../components/Footer";

function DeletePage() {
  return (
    <div>
      <Navbar />
      <DeleteTask />
      <Footer />
    </div>
  );
}

export default DeletePage;
