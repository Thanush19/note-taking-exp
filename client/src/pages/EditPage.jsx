import React from "react";
import { useParams } from "react-router-dom";
import EditNote from "../components/EditTask";

const EditNotePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Edit Note</h2>
      <EditNote noteId={id} />
    </div>
  );
};

export default EditNotePage;
