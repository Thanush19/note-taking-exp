import React from "react";
import { useParams } from "react-router-dom";
import EditNote from "../components/EditTask";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditNotePage = () => {
  const { id } = useParams();

  return (
    <div>
      <Navbar />
      <h2>Edit Note</h2>
      <EditNote noteId={id} />
      <Footer />
    </div>
  );
};

export default EditNotePage;
