import React from "react";
import Navbar from "../components/Navbar";
import CreateNote from "../components/CreateNote";
import Footer from "../components/Footer";

function CreatePage() {
  return (
    <div>
      <Navbar />
      <CreateNote />
      <Footer />
    </div>
  );
}

export default CreatePage;
