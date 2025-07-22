import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//file imports
import Registerpage from "./pages/Registerpage";
import Loginpage from "./pages/Loginpage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import FindJobsPage from "./pages/FindJobsPage";
import PostJobsPage from "./pages/PostJobsPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/findJobs" element={<ProtectedRoute allowedRoles={["user"]}>
            <FindJobsPage />
          </ProtectedRoute>} />
          <Route path="/postJobs" element={<ProtectedRoute allowedRoles={["employer"]}>
            <PostJobsPage />
          </ProtectedRoute>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
