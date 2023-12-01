import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";

import CreatePage from "./pages/CreatePage";
import DashboardPage from "./pages/DashboardPage";
import DeletePage from "./pages/DeletePage";
import SigninPage from "./pages/SigninPage";
import EditNotePage from "./pages/EditPage";
import Note from "./components/Note";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/dashboard1/:id" element={<Note />} />

          <Route path="/edit/:id" element={<EditNotePage />} />
          <Route path="/deletetask/:id" element={<DeletePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
